import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaStar, FaChevronRight, FaTrash, FaPen } from "react-icons/fa";
import { useSelector } from "react-redux"; // Assuming you use Redux for auth state

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Get auth state from Redux store
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);

  // API config with auth token
  const getConfig = () => {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    return {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `/api/reviews/product/${productId}?page=${currentPage}&limit=5`
        );

        if (currentPage === 1) {
          setReviews(data.reviews);
        } else {
          setReviews((prev) => [...prev, ...data.reviews]);
        }

        setHasMore(data.hasMore);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load reviews");
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId, currentPage]);

  // Check if the user has already submitted a review
  useEffect(() => {
    if (isAuthenticated && userInfo && reviews.length > 0) {
      const userReviewFound = reviews.find(
        (review) => review.userId === userInfo._id
      );
      if (userReviewFound) {
        setUserReview(userReviewFound);
      }
    }
  }, [reviews, isAuthenticated, userInfo]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError("Please log in to submit a review");
      return;
    }

    try {
      const reviewData = {
        rating,
        content: reviewContent,
      };

      let response;

      if (userReview) {
        // Update existing review
        response = await axios.put(
          `/api/reviews/${userReview.id || userReview._id}`,
          reviewData,
          getConfig()
        );
      } else {
        // Create new review
        response = await axios.post(
          `/api/reviews/product/${productId}`,
          reviewData,
          getConfig()
        );
      }

      const { data } = response;

      if (userReview) {
        // Update existing review in the list
        setReviews(
          reviews.map((r) =>
            r.id === data.id || r._id === data._id ? data : r
          )
        );
        setUserReview(data);
      } else {
        // Add new review to the list
        setReviews([data, ...reviews]);
        setUserReview(data);
      }

      setIsWritingReview(false);
      setReviewContent("");
      setError(null);
    } catch (err) {
      console.error("Error submitting review:", err);
      setError(
        err.response?.data?.error ||
          "Failed to submit review. Please try again."
      );
    }
  };

  const handleDeleteReview = async () => {
    if (!userReview) return;

    if (window.confirm("Are you sure you want to delete your review?")) {
      try {
        await axios.delete(
          `/api/reviews/${userReview.id || userReview._id}`,
          getConfig()
        );

        // Remove review from list
        setReviews(
          reviews.filter(
            (r) => r.id !== userReview.id && r._id !== userReview._id
          )
        );
        setUserReview(null);
        setError(null);
      } catch (err) {
        console.error("Error deleting review:", err);
        setError(
          err.response?.data?.error ||
            "Failed to delete review. Please try again."
        );
      }
    }
  };

  const handleEditReview = () => {
    if (userReview) {
      setReviewContent(userReview.content);
      setRating(userReview.rating);
      setIsWritingReview(true);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`text-xs md:text-sm ${
          i < count ? "text-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-medium text-gray-900 text-sm md:text-base">
            Customer Reviews
          </h3>
          <div className="flex items-center mt-1">
            <div className="flex text-amber-400">
              {renderStars(calculateAverageRating())}
            </div>
            <span className="ml-2 text-gray-600 text-xs md:text-sm">
              Based on {reviews.length} reviews
            </span>
          </div>
        </div>

        {isAuthenticated ? (
          userReview && !isWritingReview ? (
            <div className="flex gap-2">
              <button
                onClick={handleEditReview}
                className="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center"
              >
                <FaPen className="mr-1" /> Edit Review
              </button>
              <button
                onClick={handleDeleteReview}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium flex items-center"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsWritingReview(true)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium w-full sm:w-auto"
            >
              {userReview ? "Edit Your Review" : "Write a Review"}
            </button>
          )
        ) : (
          <button
            onClick={() => alert("Please log in to write a review")}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium w-full sm:w-auto"
          >
            Log In to Review
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isWritingReview && (
        <form
          onSubmit={handleSubmitReview}
          className="bg-gray-50 p-4 rounded-lg"
        >
          <h4 className="font-medium mb-3">
            {userReview ? "Edit Your Review" : "Write a Review"}
          </h4>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <FaStar
                    className={`text-xl ${
                      star <= rating ? "text-amber-400" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="review" className="block text-sm font-medium mb-1">
              Your Review
            </label>
            <textarea
              id="review"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              {userReview ? "Update Review" : "Submit Review"}
            </button>
            <button
              type="button"
              onClick={() => setIsWritingReview(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id || review.id}
              className="border-b border-gray-100 pb-4 md:pb-6 mb-4 md:mb-6"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-xs md:text-sm">
                    {review.user?.name?.[0] || "U"}
                  </div>
                  <span className="font-medium text-sm md:text-base">
                    {review.user?.name || "Anonymous"}
                    {userInfo && review.userId === userInfo._id && (
                      <span className="ml-2 text-xs text-blue-600">(You)</span>
                    )}
                  </span>
                </div>
                <span className="text-gray-500 text-xs md:text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex text-amber-400 mb-2">
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                {review.content}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            No reviews yet. Be the first to leave a review!
          </div>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm md:text-base"
          >
            Load more reviews
            <FaChevronRight className="ml-1 text-xs" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
