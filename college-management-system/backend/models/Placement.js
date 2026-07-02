const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    STUDENT
    ==========================================
    */

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },

    /*
    ==========================================
    COMPANY DETAILS
    ==========================================
    */

    companyName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    jobRole: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    package: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    /*
    ==========================================
    PLACEMENT DETAILS
    ==========================================
    */

    driveDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
      ],
      default: "Applied",
    },

    joiningDate: {
      type: Date,
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
    },

    /*
    ==========================================
    STATUS
    ==========================================
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
==========================================
INDEXES
==========================================
*/

placementSchema.index({
  companyName: 1,
});

placementSchema.index({
  status: 1,
});

placementSchema.index({
  student: 1,
  companyName: 1,
  jobRole: 1,
});

/*
==========================================
EXPORT
==========================================
*/

module.exports = mongoose.model(
  "Placement",
  placementSchema
);