const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET featured products
router.get("/", async (req, res) => {
  try {
    const featuredProducts = await Product.find({
      isFeatured: true,
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.json(featuredProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
