const express = require("express");

const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

/*
==========================================
Dashboard
==========================================
*/

router.get(
  "/",
  protect,
  authorize(
    "admin",
    "faculty"
  ),
  getDashboardStats
);

module.exports = router;