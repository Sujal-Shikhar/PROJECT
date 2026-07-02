const express = require("express");

const router = express.Router();

const {
  createFee,
  getFees,
  getFeeById,
  searchFees,
  updateFee,
  deleteFee,
  restoreFee,
  recordPayment,
  getStudentFees,
  getPendingFees,
  getPaidFees,
  getPartialFees,
  getFeeStats,
  dashboardSummary,
} = require("../controllers/feeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const feeValidator = require(
  "../validators/feeValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
==========================================
Dashboard & Statistics
==========================================
*/

router.get(
  "/dashboard",
  authorize("admin"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin"),
  getFeeStats
);

/*
==========================================
Search
==========================================
*/

router.get(
  "/search",
  authorize("admin", "faculty"),
  searchFees
);

/*
==========================================
Student Fee History
==========================================
*/

router.get(
  "/student/:studentId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getStudentFees
);

/*
==========================================
Payment Status
==========================================
*/

router.get(
  "/pending",
  authorize("admin"),
  getPendingFees
);

router.get(
  "/partial",
  authorize("admin"),
  getPartialFees
);

router.get(
  "/paid",
  authorize("admin"),
  getPaidFees
);

/*
==========================================
Payment
==========================================
*/

router.put(
  "/payment/:id",
  authorize("admin"),
  recordPayment
);

/*
==========================================
Restore
==========================================
*/

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreFee
);

/*
==========================================
CRUD
==========================================
*/

router.get(
  "/",
  authorize(
    "admin",
    "faculty"
  ),
  getFees
);

router.get(
  "/:id",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getFeeById
);

router.post(
  "/",
  authorize("admin"),
  feeValidator,
  validate,
  createFee
);

router.put(
  "/:id",
  authorize("admin"),
  feeValidator,
  validate,
  updateFee
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteFee
);

module.exports = router;