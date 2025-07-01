// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    console.log("Attempting to fetch products...");
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    if (products.length === 0) {
      console.warn("No products found in database");
      // Check if collection exists
      const collectionExists = await Product.db.db
        .listCollections({ name: "products" })
        .hasNext();
      console.log(`Collection exists: ${collectionExists}`);
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
