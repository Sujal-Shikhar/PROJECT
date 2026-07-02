const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    ACADEMIC DETAILS
    ==========================================
    */

    department: {
      type: String,
      required: true,
      trim: true,
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
      trim: true,
      uppercase: true,
    },

    /*
    ==========================================
    DAY & TIME
    ==========================================
    */

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    /*
    ==========================================
    SUBJECT & FACULTY
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

    roomNumber: {
      type: String,
      required: true,
      trim: true,
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
UNIQUE TIMETABLE SLOT
==========================================
*/

timetableSchema.index(
  {
    department: 1,
    semester: 1,
    section: 1,
    day: 1,
    startTime: 1,
  },
  {
    unique: true,
  }
);

/*
==========================================
INDEXES
==========================================
*/

timetableSchema.index({
  faculty: 1,
});

timetableSchema.index({
  subject: 1,
});

timetableSchema.index({
  department: 1,
  semester: 1,
});

/*
==========================================
EXPORT
==========================================
*/

module.exports = mongoose.model(
  "Timetable",
  timetableSchema
);