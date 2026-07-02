const express = require("express");

const router = express.Router();

const {
  getAttendanceReport,
  getStudentReport,
  getSubjectReport,
  getDepartmentReport,
  getDefaulters,
  getMonthlyReport,
} = require("../controllers/attendanceReportController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

/*
=========================================================
Protect All Routes
=========================================================
*/

router.use(protect);

/*
=========================================================
OVERALL ATTENDANCE REPORT
=========================================================
*/

router.get(
  "/",
  authorize(
    "admin",
    "faculty"
  ),
  getAttendanceReport
);

/*
=========================================================
STUDENT ATTENDANCE REPORT
=========================================================
*/

router.get(
  "/student/:studentId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getStudentReport
);

/*
=========================================================
SUBJECT ATTENDANCE REPORT
=========================================================
*/

router.get(
  "/subject/:subjectId",
  authorize(
    "admin",
    "faculty"
  ),
  getSubjectReport
);

/*
=========================================================
DEPARTMENT ATTENDANCE REPORT
=========================================================
*/

router.get(
  "/department/:department",
  authorize(
    "admin",
    "faculty"
  ),
  getDepartmentReport
);

/*
=========================================================
DEFAULTERS REPORT
=========================================================
*/

router.get(
  "/defaulters",
  authorize(
    "admin",
    "faculty"
  ),
  getDefaulters
);

/*
=========================================================
MONTHLY REPORT
=========================================================
*/

router.get(
  "/monthly",
  authorize(
    "admin",
    "faculty"
  ),
  getMonthlyReport
);

module.exports = router;