const { body } = require("express-validator");

/*
=====================================================
COMMON ENUMS
=====================================================
*/

const departments = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "ME",
  "CE",
  "AI",
  "DS",
];

const genders = [
  "Male",
  "Female",
  "Other",
];

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
];

const categories = [
  "General",
  "OBC",
  "SC",
  "ST",
  "EWS",
];

const admissionTypes = [
  "Regular",
  "Lateral Entry",
];

/*
=====================================================
CREATE STUDENT VALIDATION
=====================================================
*/

exports.createStudentValidator = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
      min: 2,
      max: 100,
    })
    .withMessage(
      "Name must be between 2 and 100 characters"
    ),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("phone")
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Enter a valid mobile number"
    ),

  body("rollNumber")
    .trim()
    .notEmpty()
    .withMessage(
      "Roll number is required"
    ),

  body("admissionNumber")
    .trim()
    .notEmpty()
    .withMessage(
      "Admission number is required"
    ),

  body("department")
    .isIn(departments)
    .withMessage(
      "Invalid department"
    ),

  body("semester")
    .isInt({
      min: 1,
      max: 8,
    })
    .withMessage(
      "Semester must be between 1 and 8"
    ),

  body("section")
    .optional()
    .trim(),

  body("batch")
    .trim()
    .notEmpty()
    .withMessage(
      "Batch is required"
    ),

  body("academicYear")
    .trim()
    .notEmpty()
    .withMessage(
      "Academic year is required"
    ),

  body("gender")
    .optional()
    .isIn(genders)
    .withMessage(
      "Invalid gender"
    ),

  body("bloodGroup")
    .optional()
    .isIn(bloodGroups)
    .withMessage(
      "Invalid blood group"
    ),

  body("category")
    .optional()
    .isIn(categories)
    .withMessage(
      "Invalid category"
    ),

  body("guardianEmail")
    .optional({
      checkFalsy: true,
    })
    .isEmail()
    .withMessage(
      "Guardian email is invalid"
    ),

  body("guardianPhone")
    .optional({
      checkFalsy: true,
    })
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Guardian phone is invalid"
    ),

  body("emergencyContact")
    .optional({
      checkFalsy: true,
    })
    .matches(/^[6-9]\d{9}$/)
    .withMessage(
      "Emergency contact is invalid"
    ),

  body("admissionType")
    .optional()
    .isIn(admissionTypes)
    .withMessage(
      "Invalid admission type"
    ),
];

/*
=====================================================
UPDATE VALIDATION
=====================================================
*/

exports.updateStudentValidator = [

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail(),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/),

  body("semester")
    .optional()
    .isInt({
      min: 1,
      max: 8,
    }),

  body("department")
    .optional()
    .isIn(departments),

  body("gender")
    .optional()
    .isIn(genders),

  body("bloodGroup")
    .optional()
    .isIn(bloodGroups),

  body("category")
    .optional()
    .isIn(categories),

  body("guardianEmail")
    .optional({
      checkFalsy: true,
    })
    .isEmail(),

  body("guardianPhone")
    .optional({
      checkFalsy: true,
    })
    .matches(/^[6-9]\d{9}$/),

  body("emergencyContact")
    .optional({
      checkFalsy: true,
    })
    .matches(/^[6-9]\d{9}$/),

  body("admissionType")
    .optional()
    .isIn(admissionTypes),
];