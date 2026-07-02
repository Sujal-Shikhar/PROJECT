const {
  body,
} = require(
  "express-validator"
);

module.exports = [

  body("student")
    .isMongoId()
    .withMessage(
      "Valid student ID is required."
    ),

  body("companyName")
    .trim()
    .notEmpty()
    .withMessage(
      "Company name is required."
    ),

  body("jobRole")
    .trim()
    .notEmpty()
    .withMessage(
      "Job role is required."
    ),

  body("package")
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Package must be greater than or equal to 0."
    ),

  body("location")
    .trim()
    .notEmpty()
    .withMessage(
      "Location is required."
    ),

  body("driveDate")
    .isISO8601()
    .withMessage(
      "Valid drive date is required."
    ),

  body("status")
    .optional()
    .isIn([
      "Applied",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
    ])
    .withMessage(
      "Invalid placement status."
    ),

  body("joiningDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid joining date."
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