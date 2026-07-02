const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    /*
    =====================================
    BASIC INFO
    =====================================
    */

    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      maxlength: 100,
    },

    code: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },

    /*
    =====================================
    ACADEMIC STRUCTURE
    =====================================
    */

    department: {
      type: String,
      required: true,
      enum: ["CSE", "IT", "ECE", "EEE", "ME", "CE", "AI", "DS"],
    },

    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
    },

    credits: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
    },

    /*
    =====================================
    TYPE OF SUBJECT
    =====================================
    */

    type: {
      type: String,
      enum: ["Theory", "Lab", "Elective"],
      default: "Theory",
    },

    /*
    =====================================
    RELATIONSHIP
    =====================================
    */

    faculty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      default: null,
    },

    /*
    =====================================
    STATUS
    =====================================
    */

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
=====================================
INDEXES
=====================================
*/

subjectSchema.index({
  department: 1,
  semester: 1,
});



module.exports = mongoose.model(
  "Subject",
  subjectSchema
);