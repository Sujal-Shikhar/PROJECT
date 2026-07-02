const {
  body,
} = require(
  "express-validator"
);

module.exports = [

  body("title")
    .trim()
    .notEmpty()
    .isLength({
      max: 150,
    })
    .withMessage(
      "Title is required and must not exceed 150 characters."
    ),

  body("description")
    .trim()
    .notEmpty()
    .isLength({
      max: 5000,
    })
    .withMessage(
      "Description is required and must not exceed 5000 characters."
    ),

  body("audience")
    .optional()
    .isIn([
      "All",
      "Students",
      "Faculty",
    ])
    .withMessage(
      "Invalid audience."
    ),

  body("semester")
    .optional()
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8."
    ),

  body("publishedBy")
    .isMongoId()
    .withMessage(
      "Valid publisher ID is required."
    ),

  body("publishDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid publish date."
    ),

  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Invalid expiry date."
    ),

];