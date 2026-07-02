const express = require("express");

const router = express.Router();

const {
  generateResultPDF,
  generateResultByIdPDF,
} = require("../controllers/resultPdfController");

const {
  protect,
} = require("../middleware/authMiddleware");

const authorize= require("../middleware/roleMiddleware");

/*
==========================================
All Routes Protected
==========================================
*/

router.use(protect);

/*
==========================================
Student PDF
==========================================
*/

router.get(
  "/student/:studentId",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  generateResultPDF
);

/*
==========================================
Result PDF
==========================================
*/

router.get(
  "/:id",
  authorize(
    "admin",
    "faculty",
    "student"
  ),
  generateResultByIdPDF
);

module.exports = router;