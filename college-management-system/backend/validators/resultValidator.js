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

  body("exam")
    .isMongoId()
    .withMessage(
      "Valid exam ID is required."
    ),

  body("externalMarks")
    .isFloat({
      min: 0,
      max: 100,
    })
    .withMessage(
      "External marks must be between 0 and 100."
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