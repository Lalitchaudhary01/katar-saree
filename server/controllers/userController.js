const User = require("../models/user.js");
const Testimonial = require("../models/testimonial.js");

// Signup Controller
const signup = async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ name, email });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Login Controller (Session-based)
const login = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Login failed: User not found for email:", email);
      return res.status(400).json({ message: "Invalid email" });
    }

    req.session.user = user; // Store user in session
    console.log("✅ User logged in:", user);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("❌ Server Error in login:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Logout Controller
const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });

    res.status(200).json({ message: "Logout successful" });
  });
};

// Get all testimonials
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get testimonial by ID
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonial);
  } catch (error) {
    console.error("❌ Error fetching testimonial:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create new testimonial
const createTestimonial = async (req, res) => {
  const { name, position, text, rating } = req.body;

  try {
    // Optional: Check if user is logged in
    const userId = req.session.user ? req.session.user._id : null;

    const newTestimonial = new Testimonial({
      name,
      position,
      text,
      rating,
      userId,
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    console.error("❌ Error creating testimonial:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update testimonial
const updateTestimonial = async (req, res) => {
  const { name, position, text, rating } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Optional: Check if the user is the owner of the testimonial
    if (
      req.session.user &&
      testimonial.userId &&
      testimonial.userId.toString() !== req.session.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this testimonial" });
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, position, text, rating },
      { new: true }
    );

    res.status(200).json(updatedTestimonial);
  } catch (error) {
    console.error("❌ Error updating testimonial:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete testimonial
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // Optional: Check if the user is the owner of the testimonial
    if (
      req.session.user &&
      testimonial.userId &&
      testimonial.userId.toString() !== req.session.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this testimonial" });
    }

    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting testimonial:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
