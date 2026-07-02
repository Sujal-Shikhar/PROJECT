const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
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
    ATTENDANCE
    ==========================================
    */

    date: {
      type: Date,
      required: true,
      index: true,
    },

    lectureNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },

    status: {
      type: String,
      enum: [
        "Present",
        "Absent",
        "Late",
        "Medical Leave",
      ],
      required: true,
    },

    remarks: {
      type: String,
      default: "",
      maxlength: 300,
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
=================================================
ONE ENTRY PER LECTURE
=================================================
*/

attendanceSchema.index(
  {
    student: 1,
    subject: 1,
    date: 1,
    lectureNumber: 1,
  },
  {
    unique: true,
  }
);

/*
=================================================
QUICK FILTERS
=================================================
*/

attendanceSchema.index({
  subject: 1,
  date: 1,
});



attendanceSchema.index({
  student: 1,
  status: 1,
});

module.exports = mongoose.model(
  "Attendance",
  attendanceSchema
);