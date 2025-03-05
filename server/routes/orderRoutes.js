const express = require("express");
const {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/place-order", placeOrder); // ✅ Order place karna
router.get("/admin/orders", getAllOrders); // ✅ Admin all orders dekhe
router.get("/:id", getOrderById); // ✅ Ek order ki details
router.put("/:id/status", updateOrderStatus); // ✅ Order status update

module.exports = router;
