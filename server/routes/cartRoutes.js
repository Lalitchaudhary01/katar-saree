const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const router = express.Router();

// GET /api/cart/:userId
router.get("/:userId", getCart);

// POST /api/cart
router.post("/", addToCart);

// DELETE /api/cart (remove single item)
router.delete("/", removeFromCart);

// DELETE /api/cart/clear/:userId (clear entire cart)
router.delete("/clear/:userId", clearCart);

module.exports = router;
