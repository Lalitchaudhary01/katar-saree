const mongoose = require("mongoose");

const wishlistItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discount: { type: String },
  colors: { type: [String], default: [] },
  desc: { type: String },
  currencyCode: { type: String },
  currencySymbol: { type: String },
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [wishlistItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

wishlistSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
