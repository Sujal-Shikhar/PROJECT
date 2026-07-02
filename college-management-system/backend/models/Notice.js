const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    /*
    ==========================================
    NOTICE DETAILS
    ==========================================
    */

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    /*
    ==========================================
    TARGET AUDIENCE
    ==========================================
    */

    audience: {
      type: String,
      enum: [
        "All",
        "Students",
        "Faculty",
      ],
      default: "All",
    },

    department: {
      type: String,
      trim: true,
      default: "",
    },

    semester: {
      type: Number,
      min: 1,
      max: 8,
    },

    /*
    ==========================================
    PUBLISH DETAILS
    ==========================================
    */

    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty",
      required: true,
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },

    expiryDate: {
      type: Date,
    },

    /*
    ==========================================
    STATUS
    ==========================================
    */

    isPublished: {
      type: Boolean,
      default: true,
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
INDEXES
==========================================
*/

noticeSchema.index({
  publishDate: -1,
});

noticeSchema.index({
  audience: 1,
});

noticeSchema.index({
  department: 1,
});

noticeSchema.index({
  semester: 1,
});

module.exports = mongoose.model(
  "Notice",
  noticeSchema
);