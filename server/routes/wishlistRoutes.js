const express = require("express");
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishlistController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect); // All routes require authentication

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.delete("/clear", clearWishlist);

module.exports = router;
