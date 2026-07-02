const express = require("express");

const router = express.Router();

const {
  createPlacement,
  getPlacements,
  getPlacementById,
  searchPlacements,
  updatePlacement,
  deletePlacement,
  restorePlacement,
  getStudentPlacements,
  getSelectedPlacements,
  getRejectedPlacements,
  getCompanyPlacements,
  getPlacementStats,
  dashboardSummary,
} = require("../controllers/placementController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

const placementValidator = require(
  "../validators/placementValidator"
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
  getPlacementStats
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
  searchPlacements
);

/*
==========================================
Student
==========================================
*/

router.get(
  "/student/:studentId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getStudentPlacements
);

/*
==========================================
Company
==========================================
*/

router.get(
  "/company/:company",
  authorize(
    "admin",
    "faculty"
  ),
  getCompanyPlacements
);

/*
==========================================
Status
==========================================
*/

router.get(
  "/selected",
  authorize(
    "admin",
    "faculty"
  ),
  getSelectedPlacements
);

router.get(
  "/rejected",
  authorize(
    "admin",
    "faculty"
  ),
  getRejectedPlacements
);

/*
==========================================
Restore
==========================================
*/

router.put(
  "/restore/:id",
  authorize("admin"),
  restorePlacement
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
  getPlacements
);

router.get(
  "/:id",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  getPlacementById
);

router.post(
  "/",
  authorize(
    "admin",
    "faculty"
  ),
  placementValidator,
  validate,
  createPlacement
);

router.put(
  "/:id",
  authorize(
    "admin",
    "faculty"
  ),
  placementValidator,
  validate,
  updatePlacement
);

router.delete(
  "/:id",
  authorize("admin"),
  deletePlacement
);

module.exports = router;