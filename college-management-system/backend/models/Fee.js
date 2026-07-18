const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
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
    ACADEMIC DETAILS
    ==========================================
    */

    academicYear: {
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

    /*
    ==========================================
    FEE DETAILS
    ==========================================
    */

    totalFee: {
      type: Number,
      required: true,
      min: 0,
    },

    amountPaid: {
      type: Number,
      default: 0,
      min: 0,
    },

    balance: {
      type: Number,
      default: 0,
      min: 0,
    },

    /*
    ==========================================
    PAYMENT
    ==========================================
    */

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Partial",
        "Paid",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Card",
        "Bank Transfer",
      ],
      default: "Cash",
    },

    paymentDate: {
      type: Date,
    },

    /*
    ==========================================
    EXTRA
    ==========================================
    */

    remarks: {
      type: String,
      trim: true,
      maxlength: 300,
      default: "",
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
AUTO CALCULATE BALANCE
==========================================
*/

feeSchema.pre(
  "save",
  function () {

    this.balance =
      this.totalFee -
      this.amountPaid;

    if (this.balance <= 0) {

      this.balance = 0;

      this.paymentStatus =
        "Paid";

    }

    else if (
      this.amountPaid === 0
    ) {

      this.paymentStatus =
        "Pending";

    }

    else {

      this.paymentStatus =
        "Partial";

    }

    

  }
);

/*
==========================================
UNIQUE FEE RECORD
==========================================
*/

feeSchema.index(
  {
    student: 1,
    academicYear: 1,
    semester: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model(
    "Fee",
    feeSchema
  );