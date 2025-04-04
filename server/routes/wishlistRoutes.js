const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const router = express.Router();

router.get("/:userId", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);

module.exports = router;
