// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// ✅ Middleware to verify user authentication
const verifyToken = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie
    const token = req.cookies.token; // frontend sends it automatically

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Access denied!",
      });
    }

    // 2️⃣ Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3️⃣ Store decoded user info in req.user
    req.user = decoded; // e.g., { id: 'userId', role: 'employer', iat, exp }


    // 4️⃣ Continue to next function (protected route)
    next();

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);

    return res.status(403).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = { verifyToken };
