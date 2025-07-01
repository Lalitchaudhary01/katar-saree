const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  images: [{ type: String, required: true }],
  desc: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number },
  discount: { type: String },
  sizes: [{ type: String }],
  colors: [{ type: String }],
  stock: { type: Number, required: true },
  details: {
    color: { type: String },
    technique: { type: String },
    fabric: { type: String },
    speciality: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on save
productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Product", productSchema);
