const User = require("../models/user.js");

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

module.exports = { signup, login, logout };
