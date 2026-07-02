const express = require("express");

const router = express.Router();

const {
  createFaculty,
  getFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  restoreFaculty,
  updateProfileImage,
  bulkDeleteFaculty,
  bulkRestoreFaculty,
  getFacultyStats,
  getDepartmentFaculty,
  getDesignationFaculty,
  experienceStatistics,
  salaryStatistics,
  dashboardSummary,
  exportFaculty,
  importFaculty,
} = require("../controllers/facultyController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const upload = require("../middleware/upload");

const facultyValidator = require("../validators/facultyValidator");

const validate = require("../middleware/validateMiddleware");

/*
==================================================
Protected Routes
==================================================
*/

router.use(protect);

/*
==================================================
Dashboard & Statistics
==================================================
*/

router.get(
  "/stats",
  authorize("admin"),
  getFacultyStats
);

router.get(
  "/dashboard",
  authorize("admin"),
  dashboardSummary
);

router.get(
  "/experience",
  authorize("admin"),
  experienceStatistics
);

router.get(
  "/salary",
  authorize("admin"),
  salaryStatistics
);

/*
==================================================
Export / Import
==================================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportFaculty
);

router.post(
  "/import",
  authorize("admin"),
  importFaculty
);

/*
==================================================
Department & Designation
==================================================
*/

router.get(
  "/department/:department",
  authorize("admin", "faculty"),
  getDepartmentFaculty
);

router.get(
  "/designation/:designation",
  authorize("admin", "faculty"),
  getDesignationFaculty
);

/*
==================================================
Bulk Operations
==================================================
*/

router.put(
  "/bulk-delete",
  authorize("admin"),
  bulkDeleteFaculty
);

router.put(
  "/bulk-restore",
  authorize("admin"),
  bulkRestoreFaculty
);

/*
==================================================
Image Upload
==================================================
*/

router.put(
  "/image/:id",
  authorize("admin"),
  upload.single("image"),
  updateProfileImage
);

/*
==================================================
CRUD
==================================================
*/

router.get(
  "/",
  authorize("admin", "faculty"),
  getFaculty
);

router.get(
  "/:id",
  authorize("admin", "faculty"),
  getFacultyById
);

router.post(
  "/",
  authorize("admin"),
  upload.single("image"),
  facultyValidator,
  validate,
  createFaculty
);

router.put(
  "/:id",
  authorize("admin"),
  upload.single("image"),
  facultyValidator,
  validate,
  updateFaculty
);

router.delete(
  "/:id",
  authorize("admin"),
  deleteFaculty
);

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreFaculty
);

module.exports = router;