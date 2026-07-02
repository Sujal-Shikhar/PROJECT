const {
  body,
} = require("express-validator");

module.exports = [

  body("student")
    .isMongoId()
    .withMessage(
      "Valid student ID is required."
    ),

  body("subject")
    .isMongoId()
    .withMessage(
      "Valid subject ID is required."
    ),

  body("faculty")
    .isMongoId()
    .withMessage(
      "Valid faculty ID is required."
    ),

  body("exam")
    .isMongoId()
    .withMessage(
      "Valid exam ID is required."
    ),

  body("assignmentMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 10,
    })
    .withMessage(
      "Assignment marks must be between 0 and 10."
    ),

  body("quizMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 10,
    })
    .withMessage(
      "Quiz marks must be between 0 and 10."
    ),

  body("attendanceMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 5,
    })
    .withMessage(
      "Attendance marks must be between 0 and 5."
    ),

  body("practicalMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 25,
    })
    .withMessage(
      "Practical marks must be between 0 and 25."
    ),

  body("vivaMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 10,
    })
    .withMessage(
      "Viva marks must be between 0 and 10."
    ),

  body("internalExamMarks")
    .optional()
    .isFloat({
      min: 0,
      max: 40,
    })
    .withMessage(
      "Internal exam marks must be between 0 and 40."
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