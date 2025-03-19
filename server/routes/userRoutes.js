const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/userController");

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// Testimonial routes
router.get("/testimonials", getAllTestimonials);
router.get("/testimonials/:id", getTestimonialById);
router.post("/testimonials", createTestimonial);
router.put("/testimonials/:id", updateTestimonial);
router.delete("/testimonials/:id", deleteTestimonial);

module.exports = router;
