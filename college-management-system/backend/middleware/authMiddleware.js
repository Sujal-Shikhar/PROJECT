// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

/*
=========================================
PROTECT MIDDLEWARE
=========================================
*/
const protect = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (
      !token &&
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Account is disabled.",
      });
    }

    if (
      user.passwordChangedAt &&
      decoded.iat * 1000 < user.passwordChangedAt.getTime()
    ) {
      return res.status(401).json({
        success: false,
        message: "Password changed. Login again.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

/*
=========================================
OPTIONAL AUTH
=========================================
*/
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (
      !token &&
      req.headers.authorization?.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (user) req.user = user;

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  protect,
  optionalAuth,
};