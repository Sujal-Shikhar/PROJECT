const express = require("express");

const router = express.Router();

const {
  createResult,
  getResults,
  getResultById,
  searchResults,
  updateResult,
  deleteResult,
  restoreResult,
  publishResult,
  unpublishResult,
  lockResult,
  unlockResult,
  getStudentResults,
  getSubjectResults,
  getExamResults,
  calculateSGPA,
  calculateCGPA,
  getResultStats,
  dashboardSummary,
  exportResults,
  importResults,
} = require("../controllers/resultController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const resultValidator = require(
  "../validators/resultValidator"
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
  authorize("admin", "faculty"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin", "faculty"),
  getResultStats
);

/*
==========================================
Search
==========================================
*/

router.get(
  "/search",
  authorize("admin", "faculty"),
  searchResults
);

/*
==========================================
Student Reports
==========================================
*/

router.get(
  "/student/:studentId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getStudentResults
);

router.get(
  "/student/:studentId/sgpa/:examId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  calculateSGPA
);

router.get(
  "/student/:studentId/cgpa",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  calculateCGPA
);

/*
==========================================
Subject / Exam Reports
==========================================
*/

router.get(
  "/subject/:subjectId",
  authorize(
    "admin",
    "faculty"
  ),
  getSubjectResults
);

router.get(
  "/exam/:examId",
  authorize(
    "admin",
    "faculty"
  ),
  getExamResults
);

/*
==========================================
Import / Export
==========================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportResults
);

router.post(
  "/import",
  authorize("admin"),
  importResults
);

/*
==========================================
Actions
==========================================
*/

router.put(
  "/publish/:id",
  authorize("admin"),
  publishResult
);

router.put(
  "/unpublish/:id",
  authorize("admin"),
  unpublishResult
);

router.put(
  "/lock/:id",
  authorize("admin"),
  lockResult
);

router.put(
  "/unlock/:id",
  authorize("admin"),
  unlockResult
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreResult
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
  getResults
);

router.get(
  "/:id",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getResultById
);

router.post(
  "/",
  authorize(
    "admin",
    "faculty"
  ),
  resultValidator,
  validate,
  createResult
);

router.put(
  "/:id",
  authorize(
    "admin",
    "faculty"
  ),
  resultValidator,
  validate,
  updateResult
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteResult
);

module.exports = router;