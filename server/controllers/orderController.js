const Order = require("../models/Order");
const { createOrder, verifyPayment } = require("../utils/razorpay");
const nodemailer = require("nodemailer");
const razorpay = require("../utils/razorpay").razorpay;

// Email transporter setup with improved configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // For local development only (remove in production)
  },
});

// Create Razorpay order with improved error handling
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Validate input
    if (typeof amount !== "number" || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount provided - must be a positive number",
      });
    }

    // Convert to paise
    const amountInPaise = Math.round(amount * 100);

    // Generate shorter receipt ID
    const receiptId = `ord_${Math.random().toString(36).substring(2, 10)}`;

    const options = {
      amount: amountInPaise,
      currency: currency || "INR",
      receipt: receiptId, // Now under 40 chars
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error.error || error);
    res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
      error: error.error?.description || error.message,
    });
  }
};

// Verify payment and place order with enhanced validation
exports.verifyAndPlaceOrder = async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      items,
      totalAmount,
      shippingInfo,
    } = req.body;

    // Validate required fields
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order items",
      });
    }

    // Verify payment
    const isPaymentValid = verifyPayment(
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    if (!isPaymentValid) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed - invalid signature",
      });
    }

    // Create new order with additional validation
    const newOrder = new Order({
      userId: req.user._id,
      items: items.map((item) => ({
        productId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        color: item.color,
        image: item.image,
      })),
      totalAmount: parseFloat(totalAmount).toFixed(2),
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      shippingInfo: {
        name: shippingInfo.name,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        pincode: shippingInfo.pincode,
      },
      status: "Paid",
    });

    await newOrder.save();

    // Send confirmation emails (async - don't wait for completion)
    this.sendOrderConfirmationEmails(newOrder).catch((emailError) =>
      console.error("Email sending failed:", emailError)
    );

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({
      success: false,
      message: "Order failed!",
      error: error.message || "Internal server error",
    });
  }
};

// Enhanced email sending with template improvements
exports.sendOrderConfirmationEmails = async (order) => {
  try {
    const date = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Admin email template
    const adminMailOptions = {
      from: `"Your Store Name" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "admin@example.com",
      subject: `New Order Received - #${order.paymentId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Order Received</h2>
          <p><strong>Order ID:</strong> ${order.paymentId}</p>
          <p><strong>Date:</strong> ${date}</p>
          
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Customer Details</h3>
          <p>${order.shippingInfo.name}<br>
          ${order.shippingInfo.email}<br>
          ${order.shippingInfo.phone}</p>
          
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Shipping Address</h3>
          <p>${order.shippingInfo.address}<br>
          ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${
        order.shippingInfo.pincode
      }</p>
          
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f5f5f5;">
                <th style="padding: 8px; text-align: left; border-bottom: 1px solid #ddd;">Item</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Price</th>
                <th style="padding: 8px; text-align: center; border-bottom: 1px solid #ddd;">Qty</th>
                <th style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">
                    ${item.title}<br>
                    <small>Color: ${item.color}</small>
                  </td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">₹${
                    item.price
                  }</td>
                  <td style="padding: 8px; text-align: center; border-bottom: 1px solid #ddd;">${
                    item.quantity
                  }</td>
                  <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">₹${(
                    item.price * item.quantity
                  ).toFixed(2)}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;">Total:</td>
                <td style="text-align: right; padding: 8px; font-weight: bold;">₹${
                  order.totalAmount
                }</td>
              </tr>
            </tfoot>
          </table>
        </div>
      `,
    };

    // Customer email template
    const customerMailOptions = {
      from: `"Your Store Name" <${process.env.EMAIL_USER}>`,
      to: order.shippingInfo.email,
      subject: `Your Order #${order.paymentId} has been confirmed!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your order!</h2>
          <p>Your order #${
            order.paymentId
          } has been confirmed and is being processed.</p>
          
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            ${order.items
              .map(
                (item) => `
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; vertical-align: top;">
                  <strong>${item.title}</strong><br>
                  <small>Color: ${item.color}</small>
                </td>
                <td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">
                  ₹${item.price} × ${item.quantity} = ₹${(
                  item.price * item.quantity
                ).toFixed(2)}
                </td>
              </tr>
            `
              )
              .join("")}
            <tr>
              <td style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
              <td style="padding: 8px; text-align: right; font-weight: bold;">₹${
                order.totalAmount
              }</td>
            </tr>
          </table>
          
          <h3 style="color: #555; border-bottom: 1px solid #eee; padding-bottom: 5px;">Shipping Details</h3>
          <p>${order.shippingInfo.name}<br>
          ${order.shippingInfo.address}<br>
          ${order.shippingInfo.city}, ${order.shippingInfo.state} - ${
        order.shippingInfo.pincode
      }<br>
          Phone: ${order.shippingInfo.phone}</p>
          
          <p style="margin-top: 20px;">We'll notify you when your order ships. If you have any questions, please reply to this email.</p>
          
          <p style="margin-top: 30px; color: #777; font-size: 0.9em;">
            Thank you for shopping with us!<br>
            <strong>Your Store Name</strong>
          </p>
        </div>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

// Get all orders with pagination and filtering
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalOrders = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalOrders,
        pages: Math.ceil(totalOrders / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Get single order by ID with enhanced response
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email")
      .populate("items.productId", "title images");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow admin or order owner to view the order
    if (
      req.user._id.toString() !== order.userId._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to view this order",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// Update order status with validation
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      "Paid",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // TODO: Add status change notification email

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: error.message,
    });
  }
};

// Delete order with additional checks
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow admin to delete orders
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete orders",
      });
    }

    // Don't allow deletion of orders that have been shipped or delivered
    if (["Shipped", "Delivered"].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete orders that have been shipped or delivered",
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
};
