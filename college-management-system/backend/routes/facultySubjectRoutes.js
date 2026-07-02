const express = require("express");

const router = express.Router();

const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  searchAssignments,
  updateAssignment,
  deleteAssignment,
  restoreAssignment,
  getFacultyAssignments,
  getSubjectAssignments,
  getDepartmentAssignments,
  getSemesterAssignments,
  getAssignmentStats,
  getFacultyWorkload,
  dashboardSummary,
  exportAssignments,
  importAssignments,
} = require("../controllers/facultySubjectController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const assignmentValidator = require(
  "../validators/facultySubjectValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

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
  getAssignmentStats
);

router.get(
  "/workload",
  authorize("admin"),
  getFacultyWorkload
);

/*
==================================================
Search
==================================================
*/

router.get(
  "/search",
  authorize("admin", "faculty"),
  searchAssignments
);

/*
==================================================
Reports
==================================================
*/

router.get(
  "/faculty/:facultyId",
  authorize("admin", "faculty"),
  getFacultyAssignments
);

router.get(
  "/subject/:subjectId",
  authorize("admin", "faculty"),
  getSubjectAssignments
);

router.get(
  "/department/:department",
  authorize("admin", "faculty"),
  getDepartmentAssignments
);

router.get(
  "/semester/:semester",
  authorize("admin", "faculty"),
  getSemesterAssignments
);

/*
==================================================
Import / Export
==================================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportAssignments
);

router.post(
  "/import",
  authorize("admin"),
  importAssignments
);

/*
==================================================
CRUD
==================================================
*/

router.get(
  "/",
  authorize("admin", "faculty"),
  getAssignments
);

router.get(
  "/:id",
  authorize("admin", "faculty"),
  getAssignmentById
);

router.post(
  "/",
  authorize("admin"),
  assignmentValidator,
  validate,
  createAssignment
);

router.put(
  "/:id",
  authorize("admin"),
  assignmentValidator,
  validate,
  updateAssignment
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteAssignment
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreAssignment
);

module.exports = router;