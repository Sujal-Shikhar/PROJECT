const {
  body,
} = require("express-validator");

module.exports = [
  body("student")
    .notEmpty()
    .withMessage("Student is required."),

  body("faculty")
    .notEmpty()
    .withMessage("Faculty is required."),

  body("subject")
    .notEmpty()
    .withMessage("Subject is required."),

  body("date")
    .notEmpty()
    .withMessage("Date is required.")
    .isISO8601()
    .withMessage("Invalid date."),

  body("lectureNumber")
    .isInt({
      min: 1,
      max: 10,
    })
    .withMessage(
      "Lecture number must be between 1 and 10."
    ),

  body("status")
    .isIn([
      "Present",
      "Absent",
      "Late",
      "Medical Leave",
    ])
    .withMessage(
      "Invalid attendance status."
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