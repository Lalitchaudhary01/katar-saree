// controllers/reviewController.js
const Review = require("../models/review");
const User = require("../models/user");
const mongoose = require("mongoose");

// Get all reviews for a specific product
exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Count total reviews for this product
    const totalCount = await Review.countDocuments({
      productId: productId,
    });

    // Get reviews with user info
    const reviews = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$userDetails", 0] },
        },
      },
      {
        $project: {
          _id: 1,
          id: { $toString: "$_id" },
          productId: 1,
          userId: 1,
          rating: 1,
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          "user.name": 1,
          "user.email": 1,
          "user.avatar": 1,
        },
      },
    ]);

    return res.status(200).json({
      reviews,
      hasMore: totalCount > skip + reviews.length,
      total: totalCount,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id; // Assuming middleware sets req.user
    const { rating, content } = req.body;

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Validate input
    if (!rating || !content) {
      return res.status(400).json({ error: "Rating and content are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      productId,
      userId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this product" });
    }

    // Create new review
    const newReview = new Review({
      productId,
      userId,
      rating,
      content,
    });

    await newReview.save();

    // Get user info for response
    const user = await User.findById(userId).select("name email avatar");

    // Format response
    const response = {
      id: newReview._id,
      productId: newReview.productId,
      userId: newReview.userId,
      rating: newReview.rating,
      content: newReview.content,
      createdAt: newReview.createdAt,
      updatedAt: newReview.updatedAt,
      user: user,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error("Error creating review:", error);

    // Handle duplicate key error (user already reviewed this product)
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this product" });
    }

    return res.status(500).json({ error: "Failed to create review" });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id; // From auth middleware
    const { rating, content } = req.body;

    // Validate review ID
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    // Validate input
    if (!rating || !content) {
      return res.status(400).json({ error: "Rating and content are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Find the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this review" });
    }

    // Update review
    review.rating = rating;
    review.content = content;
    await review.save();

    // Get user info for response
    const user = await User.findById(userId).select("name email avatar");

    // Format response
    const response = {
      id: review._id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      user: user,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error updating review:", error);
    return res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id; // From auth middleware

    // Validate review ID
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    // Find the review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Check if user owns the review
    if (review.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this review" });
    }

    // Delete the review
    await Review.findByIdAndDelete(reviewId);

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    return res.status(500).json({ error: "Failed to delete review" });
  }
};

// Get a single review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Validate review ID
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Get user info
    const user = await User.findById(review.userId).select("name email avatar");

    // Format response
    const response = {
      id: review._id,
      productId: review.productId,
      userId: review.userId,
      rating: review.rating,
      content: review.content,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      user: user,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({ error: "Failed to fetch review" });
  }
};

// Get reviews by user ID
exports.getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Count total reviews for this user
    const totalCount = await Review.countDocuments({ userId });

    // Get reviews with product info
    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("productId", "name price images");

    return res.status(200).json({
      reviews,
      hasMore: totalCount > skip + reviews.length,
      total: totalCount,
    });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    return res.status(500).json({ error: "Failed to fetch reviews" });
  }
};
