const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    BASIC INFORMATION
    ==========================================
    */

    examName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    examType: {
      type: String,
      enum: [
        "Internal",
        "Mid Semester",
        "End Semester",
        "Practical",
        "Viva",
      ],
      required: true,
    },

    /*
    ==========================================
    REFERENCES
    ==========================================
    */

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    /*
    ==========================================
    ACADEMICS
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

    /*
    ==========================================
    SCHEDULE
    ==========================================
    */

    examDate: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true,
    },

    /*
    ==========================================
    MARKS
    ==========================================
    */

    totalMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    passingMarks: {
      type: Number,
      required: true,
      min: 1,
    },

    /*
    ==========================================
    STATUS
    ==========================================
    */

    status: {
      type: String,
      enum: [
        "Scheduled",
        "Completed",
        "Cancelled",
      ],
      default: "Scheduled",
    },

    instructions: {
      type: String,
      maxlength: 500,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    /*
    ==========================================
    AUDIT
    ==========================================
    */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

/*
==========================================
INDEXES
==========================================
*/

examSchema.index({
  department: 1,
  semester: 1,
});

examSchema.index({
  examDate: 1,
});

examSchema.index({
  subject: 1,
});

examSchema.index({
  faculty: 1,
});

module.exports = mongoose.model(
  "Exam",
  examSchema
);