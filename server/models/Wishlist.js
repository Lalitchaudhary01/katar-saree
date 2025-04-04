const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [wishlistItemSchema],
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
