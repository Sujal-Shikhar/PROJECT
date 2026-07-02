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

  body("academicYear")
    .trim()
    .notEmpty()
    .withMessage(
      "Academic year is required."
    ),

  body("semester")
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8."
    ),

  body("totalFee")
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Total fee must be greater than or equal to 0."
    ),

  body("amountPaid")
    .optional()
    .isFloat({
      min: 0,
    })
    .withMessage(
      "Amount paid cannot be negative."
    ),

  body("paymentMethod")
    .optional()
    .isIn([
      "Cash",
      "UPI",
      "Card",
      "Bank Transfer",
    ])
    .withMessage(
      "Invalid payment method."
    ),

  body("paymentDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid payment date."
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