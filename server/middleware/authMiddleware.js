const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify environment variable
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined");
        return res.status(500).json({ error: "Server configuration error" });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token without password
      req.user = await User.findById(decoded._id).select("-password");

      if (!req.user) {
        console.error("User not found for token");
        return res.status(401).json({ error: "User not found" });
      }

      // Attach additional user info if needed
      req.user._id = req.user._id.toString(); // Ensure _id is string

      // Proceed to next middleware
      return next();
    } catch (error) {
      console.error("Authentication error:", error);

      // Handle different error types specifically
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ error: "Token expired, please login again" });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      }

      return res.status(401).json({ error: "Not authorized" });
    }
  }

  // Also check for token in cookies (if using cookies)
  if (req.cookies?.token) {
    token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id).select("-password");
      return next();
    } catch (error) {
      console.error("Cookie token error:", error);
      // Continue to return the no token error below
    }
  }

  // If no token found
  return res.status(401).json({
    error: "Not authorized, no token provided",
    solution: "Please login to access this resource",
  });
};

// Optional admin check middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({
    error: "Not authorized as admin",
  });
};

module.exports = { protect, admin };
