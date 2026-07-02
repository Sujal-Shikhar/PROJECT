const express = require("express");

const router = express.Router();

const {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  restoreSubject,
  assignFaculty,
  removeFaculty,
  getDepartmentSubjects,
  getSemesterSubjects,
  getSubjectStats,
  dashboardSummary,
  exportSubjects,
  importSubjects,
} = require("../controllers/subjectController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const subjectValidator = require(
  "../validators/subjectValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
============================================
Dashboard & Statistics
============================================
*/

router.get(
  "/dashboard",
  authorize("admin", "faculty"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin", "faculty"),
  getSubjectStats
);

/*
============================================
Export / Import
============================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportSubjects
);

router.post(
  "/import",
  authorize("admin"),
  importSubjects
);

/*
============================================
Department & Semester
============================================
*/

router.get(
  "/department/:department",
  authorize("admin", "faculty", "student"),
  getDepartmentSubjects
);

router.get(
  "/semester/:semester",
  authorize("admin", "faculty", "student"),
  getSemesterSubjects
);

/*
============================================
Faculty Assignment
============================================
*/

router.put(
  "/assign/:id",
  authorize("admin"),
  assignFaculty
);

router.put(
  "/remove-faculty/:id",
  authorize("admin"),
  removeFaculty
);

/*
============================================
CRUD
============================================
*/

router.get(
  "/",
  authorize("admin", "faculty", "student"),
  getSubjects
);

router.get(
  "/:id",
  authorize("admin", "faculty", "student"),
  getSubjectById
);

router.post(
  "/",
  authorize("admin"),
  subjectValidator,
  validate,
  createSubject
);

router.put(
  "/:id",
  authorize("admin"),
  subjectValidator,
  validate,
  updateSubject
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteSubject
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreSubject
);

module.exports = router;