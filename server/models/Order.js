// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      title: String,
      price: Number,
      color: String,
      image: String,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentId: String,
  status: { type: String, default: "Pending" },
  shippingInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
