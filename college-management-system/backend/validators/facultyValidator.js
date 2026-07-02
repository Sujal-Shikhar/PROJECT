const {
  body,
} = require("express-validator");

module.exports = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage(
      "Faculty name is required."
    )
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "Faculty name must be between 2 and 100 characters."
    ),

  body("employeeId")
    .trim()
    .notEmpty()
    .withMessage(
      "Employee ID is required."
    ),

  body("email")
    .trim()
    .isEmail()
    .withMessage(
      "Enter a valid email."
    )
    .normalizeEmail(),

  body("phone")
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Enter a valid phone number."
    ),

  body("department")
    .notEmpty()
    .withMessage(
      "Department is required."
    ),

  body("designation")
    .notEmpty()
    .withMessage(
      "Designation is required."
    ),

  body("qualification")
    .trim()
    .notEmpty()
    .withMessage(
      "Qualification is required."
    ),

  body("experience")
    .optional()
    .isNumeric()
    .withMessage(
      "Experience must be numeric."
    )
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Experience cannot be negative."
    ),

  body("salary")
    .optional()
    .isNumeric()
    .withMessage(
      "Salary must be numeric."
    )
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Salary cannot be negative."
    ),

  body("gender")
    .optional()
    .isIn([
      "Male",
      "Female",
      "Other",
    ])
    .withMessage(
      "Invalid gender."
    ),

  body("bloodGroup")
    .optional()
    .isIn([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ])
    .withMessage(
      "Invalid blood group."
    ),

  body("maritalStatus")
    .optional()
    .isIn([
      "Single",
      "Married",
    ])
    .withMessage(
      "Invalid marital status."
    ),
];