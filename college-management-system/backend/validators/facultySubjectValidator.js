const {
  body,
} = require("express-validator");

module.exports = [

  body("faculty")
    .isMongoId()
    .withMessage(
      "Valid faculty ID is required."
    ),

  body("subject")
    .isMongoId()
    .withMessage(
      "Valid subject ID is required."
    ),

  body("department")
    .isIn([
      "CSE",
      "IT",
      "ECE",
      "EEE",
      "ME",
      "CE",
      "AI",
      "DS",
    ])
    .withMessage(
      "Invalid department."
    ),

  body("semester")
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8."
    ),

  body("section")
    .trim()
    .notEmpty()
    .withMessage(
      "Section is required."
    )
    .isLength({
      min: 1,
      max: 3,
    })
    .withMessage(
      "Section must be between 1 and 3 characters."
    ),

  body("academicYear")
    .trim()
    .matches(/^\d{4}-\d{2}$/)
    .withMessage(
      "Academic year must be in YYYY-YY format (e.g. 2026-27)."
    ),

  body("isCoordinator")
    .optional()
    .isBoolean()
    .withMessage(
      "isCoordinator must be true or false."
    ),

  body("remarks")
    .optional()
    .isLength({
      max: 300,
    })
    .withMessage(
      "Remarks cannot exceed 300 characters."
    ),
];