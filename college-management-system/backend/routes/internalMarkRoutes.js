const express = require("express");

const router = express.Router();

const {
  createInternalMark,
  getInternalMarks,
  getInternalMarkById,
  searchInternalMarks,
  updateInternalMark,
  deleteInternalMark,
  restoreInternalMark,
  publishMarks,
  unpublishMarks,
  lockMarks,
  unlockMarks,
  getStudentInternalMarks,
  getSubjectInternalMarks,
  getExamInternalMarks,
  getInternalMarkStats,
  dashboardSummary,
  exportInternalMarks,
  importInternalMarks,
} = require("../controllers/internalMarkController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const internalMarkValidator = require(
  "../validators/internalMarkValidator"
);

const validate = require(
  "../middleware/validateMiddleware");

router.use(protect);

/*
==================================================
Dashboard
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
  getInternalMarkStats
);

/*
==================================================
Search
==================================================
*/

router.get(
  "/search",
  authorize("admin", "faculty"),
  searchInternalMarks
);

/*
==================================================
Reports
==================================================
*/

router.get(
  "/student/:studentId",
  authorize("admin", "faculty", "student"),
  getStudentInternalMarks
);

router.get(
  "/subject/:subjectId",
  authorize("admin", "faculty"),
  getSubjectInternalMarks
);

router.get(
  "/exam/:examId",
  authorize("admin", "faculty"),
  getExamInternalMarks
);

/*
==================================================
Import / Export
==================================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportInternalMarks
);

router.post(
  "/import",
  authorize("admin"),
  importInternalMarks
);

/*
==================================================
Actions
==================================================
*/

router.put(
  "/publish/:id",
  authorize("admin", "faculty"),
  publishMarks
);

router.put(
  "/unpublish/:id",
  authorize("admin", "faculty"),
  unpublishMarks
);

router.put(
  "/lock/:id",
  authorize("admin"),
  lockMarks
);

router.put(
  "/unlock/:id",
  authorize("admin"),
  unlockMarks
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreInternalMark
);

/*
==================================================
CRUD
==================================================
*/

router.get(
  "/",
  authorize("admin", "faculty"),
  getInternalMarks
);

router.get(
  "/:id",
  authorize("admin", "faculty", "student"),
  getInternalMarkById
);

router.post(
  "/",
  authorize("admin", "faculty"),
  internalMarkValidator,
  validate,
  createInternalMark
);

router.put(
  "/:id",
  authorize("admin", "faculty"),
  internalMarkValidator,
  validate,
  updateInternalMark
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteInternalMark
);

module.exports = router;