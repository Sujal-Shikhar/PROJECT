const {
  body,
} = require("express-validator");

module.exports = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Subject name is required.")
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "Subject name must be between 2 and 100 characters."
    ),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("Subject code is required.")
    .isLength({
      min: 2,
      max: 20,
    })
    .withMessage(
      "Subject code must be between 2 and 20 characters."
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
    .withMessage("Invalid department."),

  body("semester")
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8."
    ),

  body("credits")
    .isInt({
      min: 1,
      max: 6,
    })
    .withMessage(
      "Credits must be between 1 and 6."
    ),

  body("type")
    .optional()
    .isIn([
      "Theory",
      "Lab",
      "Elective",
    ])
    .withMessage("Invalid subject type."),

  body("faculty")
    .optional({
      nullable: true,
    })
    .isMongoId()
    .withMessage(
      "Invalid faculty ID."
    ),
];