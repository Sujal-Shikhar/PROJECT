const {
  body,
} = require("express-validator");

module.exports = [

  body("examName")
    .trim()
    .notEmpty()
    .withMessage("Exam name is required.")
    .isLength({
      max: 100,
    })
    .withMessage(
      "Exam name cannot exceed 100 characters."
    ),

  body("examType")
    .isIn([
      "Internal",
      "Mid Semester",
      "End Semester",
      "Practical",
      "Viva",
    ])
    .withMessage("Invalid exam type."),

  body("subject")
    .notEmpty()
    .withMessage("Subject is required."),

  body("faculty")
    .notEmpty()
    .withMessage("Faculty is required."),

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
    .withMessage("Invalid department."),

  body("semester")
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8."
    ),

  body("examDate")
    .isISO8601()
    .withMessage("Invalid exam date."),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required."),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required."),

  body("roomNumber")
    .trim()
    .notEmpty()
    .withMessage("Room number is required."),

  body("totalMarks")
    .isNumeric()
    .withMessage("Total marks must be numeric.")
    .custom((value) => value > 0)
    .withMessage("Total marks must be greater than 0."),

  body("passingMarks")
    .isNumeric()
    .withMessage("Passing marks must be numeric.")
    .custom((value, { req }) => {
      return value <= req.body.totalMarks;
    })
    .withMessage(
      "Passing marks cannot exceed total marks."
    ),

  body("instructions")
    .optional()
    .isLength({
      max: 500,
    })
    .withMessage(
      "Instructions cannot exceed 500 characters."
    ),
];