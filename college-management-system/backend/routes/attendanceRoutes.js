const express = require("express");

const router = express.Router();

const {
  markAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
  bulkAttendance,
  bulkDeleteAttendance,
  getStudentAttendance,
  getSubjectAttendance,
  getFacultyAttendance,
  getAttendancePercentage,
  lowAttendanceReport,
  getAttendanceStats,
  monthlyAttendance,
  dashboardSummary,
  exportAttendance,
} = require("../controllers/attendanceController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const attendanceValidator = require(
  "../validators/attendanceValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
=========================================
Dashboard
=========================================
*/

router.get(
  "/dashboard",
  authorize("admin", "faculty"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin", "faculty"),
  getAttendanceStats
);

router.get(
  "/monthly",
  authorize("admin", "faculty"),
  monthlyAttendance
);

router.get(
  "/low-attendance",
  authorize("admin", "faculty"),
  lowAttendanceReport
);

router.get(
  "/export",
  authorize("admin"),
  exportAttendance
);

/*
=========================================
Student Reports
=========================================
*/

router.get(
  "/student/:studentId",
  authorize("admin", "faculty", "student"),
  getStudentAttendance
);

router.get(
  "/student/:studentId/percentage",
  authorize("admin", "faculty", "student"),
  getAttendancePercentage
);

/*
=========================================
Faculty Reports
=========================================
*/

router.get(
  "/faculty/:facultyId",
  authorize("admin", "faculty"),
  getFacultyAttendance
);

/*
=========================================
Subject Reports
=========================================
*/

router.get(
  "/subject/:subjectId",
  authorize("admin", "faculty"),
  getSubjectAttendance
);

/*
=========================================
Bulk Operations
=========================================
*/

router.post(
  "/bulk",
  authorize("admin", "faculty"),
  bulkAttendance
);

router.delete(
  "/bulk",
  authorize("admin"),
  bulkDeleteAttendance
);

/*
=========================================
CRUD
=========================================
*/

router.get(
  "/",
  authorize("admin", "faculty"),
  getAttendance
);

router.get(
  "/:id",
  authorize("admin", "faculty"),
  getAttendanceById
);

router.post(
  "/",
  authorize("admin", "faculty"),
  attendanceValidator,
  validate,
  markAttendance
);

router.put(
  "/:id",
  authorize("admin", "faculty"),
  attendanceValidator,
  validate,
  updateAttendance
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteAttendance
);

module.exports = router;