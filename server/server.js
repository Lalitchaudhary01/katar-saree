const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // 🏷️ **1. Create Order API**
// app.post("/create-order", async (req, res) => {
//   try {
//     const { amount } = req.body;

//     const options = {
//       amount: amount * 100, // Razorpay paise me leta hai
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     res.json({ orderId: order.id });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🏷️ **2. Verify Payment API**
// app.post("/verify-payment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       res.json({ success: true, paymentId: razorpay_payment_id });
//     } else {
//       res
//         .status(400)
//         .json({ success: false, message: "Payment verification failed" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 5000"));
