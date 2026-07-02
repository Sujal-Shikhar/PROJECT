const express = require("express");

const router = express.Router();

const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  restoreExam,
  getUpcomingExams,
  getCompletedExams,
  cancelExam,
  rescheduleExam,
  getExamStats,
  getDepartmentExams,
  getSemesterExams,
  examCalendar,
  dashboardSummary,
  exportExams,
  importExams,
} = require("../controllers/examController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const examValidator = require(
  "../validators/examValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
==================================================
Dashboard & Statistics
==================================================
*/

router.get(
  "/dashboard",
  authorize("admin", "faculty"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin", "faculty"),
  getExamStats
);

router.get(
  "/calendar",
  authorize("admin", "faculty", "student"),
  examCalendar
);

/*
==================================================
Reports
==================================================
*/

router.get(
  "/upcoming",
  authorize("admin", "faculty", "student"),
  getUpcomingExams
);

router.get(
  "/completed",
  authorize("admin", "faculty"),
  getCompletedExams
);

router.get(
  "/department/:department",
  authorize("admin", "faculty"),
  getDepartmentExams
);

router.get(
  "/semester/:semester",
  authorize("admin", "faculty", "student"),
  getSemesterExams
);

/*
==================================================
Export / Import
==================================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportExams
);

router.post(
  "/import",
  authorize("admin"),
  importExams
);

/*
==================================================
CRUD
==================================================
*/

router.get(
  "/",
  authorize("admin", "faculty", "student"),
  getExams
);

router.get(
  "/:id",
  authorize("admin", "faculty", "student"),
  getExamById
);

router.post(
  "/",
  authorize("admin"),
  examValidator,
  validate,
  createExam
);

router.put(
  "/:id",
  authorize("admin"),
  examValidator,
  validate,
  updateExam
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteExam
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreExam
);

router.put(
  "/cancel/:id",
  authorize("admin"),
  cancelExam
);

router.put(
  "/reschedule/:id",
  authorize("admin"),
  rescheduleExam
);

module.exports = router;