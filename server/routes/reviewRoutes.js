// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");

// Get all reviews for a product (public)
router.get("/product/:productId", reviewController.getProductReviews);

// Get a specific review by ID (public)
router.get("/:reviewId", reviewController.getReviewById);

// Get all reviews by the logged-in user
router.get("/user/me", protect, reviewController.getUserReviews);

// Create a new review (requires authentication)
router.post("/product/:productId", protect, reviewController.createReview);

// Update a review (requires authentication)
router.put("/:reviewId", protect, reviewController.updateReview);

// Delete a review (requires authentication)
router.delete("/:reviewId", protect, reviewController.deleteReview);

module.exports = router;