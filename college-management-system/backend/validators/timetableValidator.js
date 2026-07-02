const {
  body,
} = require(
  "express-validator"
);

module.exports = [

  body("department")
    .trim()
    .notEmpty()
    .withMessage(
      "Department is required."
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
    ),

  body("day")
    .isIn([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ])
    .withMessage(
      "Invalid day."
    ),

  body("startTime")
    .notEmpty()
    .withMessage(
      "Start time is required."
    ),

  body("endTime")
    .notEmpty()
    .withMessage(
      "End time is required."
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

  body("roomNumber")
    .trim()
    .notEmpty()
    .withMessage(
      "Room number is required."
    ),

];