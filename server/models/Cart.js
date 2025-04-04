const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  size: { type: String },
  color: { type: String },
  addedAt: { type: Date, default: Date.now },
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema],
});

module.exports = mongoose.model("Cart", cartSchema);
