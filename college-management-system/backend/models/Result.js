const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
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

    internalMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    externalMarks: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    totalMarks: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    grade: {
      type: String,
      default: "",
    },

    gradePoint: {
      type: Number,
      default: 0,
    },

    result: {
      type: String,
      enum: [
        "Pass",
        "Fail",
      ],
      default: "Fail",
    },

    /*
    ==========================================
    STATUS
    ==========================================
    */

    isPublished: {
      type: Boolean,
      default: false,
    },

    isLocked: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
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
AUTO CALCULATE
==========================================
*/

resultSchema.pre(
  "save",
  function (next) {

    this.totalMarks =
      this.internalMarks +
      this.externalMarks;

    this.percentage =
      this.totalMarks / 2;

    /*
    Grade Calculation
    */

    if (this.percentage >= 90) {
      this.grade = "O";
      this.gradePoint = 10;
      this.result = "Pass";
    }

    else if (
      this.percentage >= 80
    ) {
      this.grade = "A+";
      this.gradePoint = 9;
      this.result = "Pass";
    }

    else if (
      this.percentage >= 70
    ) {
      this.grade = "A";
      this.gradePoint = 8;
      this.result = "Pass";
    }

    else if (
      this.percentage >= 60
    ) {
      this.grade = "B+";
      this.gradePoint = 7;
      this.result = "Pass";
    }

    else if (
      this.percentage >= 50
    ) {
      this.grade = "B";
      this.gradePoint = 6;
      this.result = "Pass";
    }

    else if (
      this.percentage >= 40
    ) {
      this.grade = "C";
      this.gradePoint = 5;
      this.result = "Pass";
    }

    else {

      this.grade = "F";
      this.gradePoint = 0;
      this.result = "Fail";

    }

    next();

  }
);

/*
==========================================
UNIQUE RESULT
==========================================
*/

resultSchema.index(
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
  "Result",
  resultSchema
);