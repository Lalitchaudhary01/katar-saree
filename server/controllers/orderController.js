const Order = require("../models/Order");

// 📌 Order Place Karna
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentId } = req.body;

    const newOrder = new Order({ userId, items, totalAmount, paymentId });
    await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Order failed!", error });
  }
};

// 📌 Admin ke liye Orders List
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

// 📌 Ek Order Details Get Karna
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "userId",
      "name email"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

// 📌 Admin Order Status Update Kare
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error });
  }
};

// 📌 Admin Order Delete Kare
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted", order });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
};
