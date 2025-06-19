// utils/razorpay.js
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency, receipt) => {
  const options = {
    amount: amount * 100, // amount in smallest currency unit (paise for INR)
    currency,
    receipt,
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    return response;
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    throw err;
  }
};

const verifyPayment = (
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  return generatedSignature === razorpaySignature;
};

module.exports = {
  razorpay, // Make sure this is exported
  createOrder,
  verifyPayment,
};
