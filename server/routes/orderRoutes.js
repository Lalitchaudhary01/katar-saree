const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  createRazorpayOrder,
  verifyAndPlaceOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// Payment routes
router.post("/create-razorpay-order", protect, createRazorpayOrder);
router.post("/verify-payment", protect, verifyAndPlaceOrder);

// Order management routes
router.get("/", protect, admin, getAllOrders);
router.get("/my-orders", protect, (req, res) => {
  // Redirect to user-specific orders
  res.redirect(`/api/orders/user/${req.user._id}`);
});
router.get("/user/:userId", protect, async (req, res) => {
  // Implementation for getting user's orders
});
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;
