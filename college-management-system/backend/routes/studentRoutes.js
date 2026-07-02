const express = require("express");

const router = express.Router();

const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  restoreStudent,
  bulkDeleteStudents,
  bulkRestoreStudents,
  getStudentStats,
  dashboardSummary,
  exportStudents,
  importStudents,
  updateProfileImage,
  getDepartmentStudents,
  getSemesterStudents,
} = require("../controllers/studentController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const upload = require("../middleware/upload");

const validate = require("../middleware/validateMiddleware");

const {
  createStudentValidator,
  updateStudentValidator,
} = require("../validators/studentValidator");

/*
===========================================
All Routes Protected
===========================================
*/

router.use(protect);

/*
===========================================
Dashboard
===========================================
*/

router.get(
  "/dashboard",
  authorize("admin", "faculty"),
  dashboardSummary
);

router.get(
  "/stats",
  authorize("admin", "faculty"),
  getStudentStats
);

/*
===========================================
Import / Export
===========================================
*/

router.get(
  "/export",
  authorize("admin"),
  exportStudents
);

router.post(
  "/import",
  authorize("admin"),
  importStudents
);

/*
===========================================
Department / Semester
===========================================
*/

router.get(
  "/department/:department",
  authorize("admin", "faculty"),
  getDepartmentStudents
);

router.get(
  "/semester/:semester",
  authorize("admin", "faculty"),
  getSemesterStudents
);

/*
===========================================
Bulk Operations
===========================================
*/

router.put(
  "/bulk-delete",
  authorize("admin"),
  bulkDeleteStudents
);

router.put(
  "/bulk-restore",
  authorize("admin"),
  bulkRestoreStudents
);

/*
===========================================
Profile Image
===========================================
*/

router.put(
  "/:id/profile-image",
  authorize("admin"),
  upload.single("image"),
  updateProfileImage
);

/*
===========================================
Student CRUD
===========================================
*/

router
  .route("/")
  .get(
    authorize("admin", "faculty"),
    getStudents
  )
  .post(
    authorize("admin"),
    upload.single("image"),
    createStudentValidator,
    validate,
    createStudent
  );

router
  .route("/:id")
  .get(
    authorize("admin", "faculty"),
    getStudentById
  )
  .put(
    authorize("admin"),
    updateStudentValidator,
    validate,
    updateStudent
  )
  .delete(
    authorize("admin"),
    deleteStudent
  );

router.put(
  "/restore/:id",
  authorize("admin"),
  restoreStudent
);

module.exports = router;