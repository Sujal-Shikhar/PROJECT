const mongoose = require("mongoose");

const internalMarkSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    REFERENCES
    ==========================================
    */

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
      index: true,
    },

    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
      index: true,
    },

    /*
    ==========================================
    MARKS
    ==========================================
    */

    assignmentMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    quizMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    attendanceMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    practicalMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 25,
    },

    vivaMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },

    internalExamMarks: {
      type: Number,
      default: 0,
      min: 0,
      max: 40,
    },

    totalInternalMarks: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    isLocked: {
      type: Boolean,
      default: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
==========================================
AUTO TOTAL
==========================================
*/

internalMarkSchema.pre("save", function (next) {

  this.totalInternalMarks =
    this.assignmentMarks +
    this.quizMarks +
    this.attendanceMarks +
    this.practicalMarks +
    this.vivaMarks +
    this.internalExamMarks;

  next();

});

/*
==========================================
UNIQUE INDEX
==========================================
*/

internalMarkSchema.index(
  {
    student: 1,
    subject: 1,
    exam: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model(
  "InternalMark",
  internalMarkSchema
);