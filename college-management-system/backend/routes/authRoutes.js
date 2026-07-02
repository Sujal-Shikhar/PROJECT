const express = require("express");
const router = express.Router();

const {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
} = require("../controllers/authController");

const {
  protect,
  optionalAuth,
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");
const authLimiter = require("../middleware/authLimiter");

/*
=====================================================
PUBLIC ROUTES
=====================================================
*/

router.post("/register", authLimiter, register);

router.post("/login", authLimiter, login);

router.post("/refresh-token", refreshToken);

router.post("/forgot-password", authLimiter, forgotPassword);

router.put("/reset-password/:token", resetPassword);

router.get("/verify-email/:token", verifyEmail);

/*
=====================================================
PROTECTED ROUTES
=====================================================
*/

router.get("/me", protect, getMe);

router.post("/logout", protect, logout);

router.put("/update-profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.post("/resend-verification", protect, resendVerification);

/*
=====================================================
ADMIN ROUTE
=====================================================
*/

router.get("/admin-only", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

/*
=====================================================
FACULTY ROUTE
=====================================================
*/

router.get(
  "/faculty-only",
  protect,
  authorize("faculty", "admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Faculty Access Granted",
    });
  }
);

/*
=====================================================
STUDENT ROUTE
=====================================================
*/

router.get(
  "/student-only",
  protect,
  authorize("student"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Student Access Granted",
    });
  }
);

module.exports = router;