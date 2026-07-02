const express = require("express");

const router = express.Router();

const {

  createTimetable,

  getTimetable,

  getTimetableById,

  searchTimetable,

  updateTimetable,

  deleteTimetable,

  restoreTimetable,

  getFacultyTimetable,

  getClassTimetable,

  getTodayTimetable,

  getTimetableStats,

  dashboardSummary,

} = require(
  "../controllers/timetableController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const authorize= require(
  "../middleware/roleMiddleware"
);

const timetableValidator = require(
  "../validators/timetableValidator"
);

const validate = require(
  "../middleware/validateMiddleware"
);

router.use(protect);

/*
==========================================
Dashboard
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
  getTimetableStats
);

/*
==========================================
Search
==========================================
*/

router.get(
  "/search",
  authorize(
    "admin",
    "faculty"
  ),
  searchTimetable
);

/*
==========================================
Today's Timetable
==========================================
*/

router.get(
  "/today",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getTodayTimetable
);

/*
==========================================
Faculty Timetable
==========================================
*/

router.get(
  "/faculty/:facultyId",
  authorize(
    "admin",
    "faculty"
  ),
  getFacultyTimetable
);

/*
==========================================
Class Timetable
==========================================
*/

router.get(
  "/class/:department/:semester/:section",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getClassTimetable
);

/*
==========================================
Restore
==========================================
*/

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreTimetable
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
    "faculty",
    "student"
  ),
  getTimetable
);

router.get(
  "/:id",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getTimetableById
);

router.post(
  "/",
  authorize("admin"),
  timetableValidator,
  validate,
  createTimetable
);

router.put(
  "/:id",
  authorize("admin"),
  timetableValidator,
  validate,
  updateTimetable
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteTimetable
);

module.exports = router;