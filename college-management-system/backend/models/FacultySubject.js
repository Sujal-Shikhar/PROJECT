const mongoose = require("mongoose");

const facultySubjectSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    REFERENCES
    ==========================================
    */

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
      index: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    /*
    ==========================================
    ACADEMIC DETAILS
    ==========================================
    */

    department: {
      type: String,
      required: true,
      enum: [
        "CSE",
        "IT",
        "ECE",
        "EEE",
        "ME",
        "CE",
        "AI",
        "DS",
      ],
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      default: "A",
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
      example: "2026-27",
    },

    /*
    ==========================================
    STATUS
    ==========================================
    */

    isCoordinator: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    remarks: {
      type: String,
      default: "",
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

/*
==========================================
UNIQUE CONSTRAINT
==========================================
*/

facultySubjectSchema.index(
  {
    faculty: 1,
    subject: 1,
    semester: 1,
    section: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

/*
==========================================
SEARCH INDEXES
==========================================
*/

facultySubjectSchema.index({
  department: 1,
  semester: 1,
});

facultySubjectSchema.index({
  academicYear: 1,
});

module.exports = mongoose.model(
  "FacultySubject",
  facultySubjectSchema
);