const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    /*
    =====================================
    BASIC INFORMATION
    =====================================
    */

    name: {
      type: String,
      required: [true, "Student name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        "Enter a valid mobile number",
      ],
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    admissionNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    /*
    =====================================
    ACADEMIC DETAILS
    =====================================
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
      default: "A",
      uppercase: true,
      trim: true,
    },

    batch: {
      type: String,
      required: true,
      trim: true,
    },

    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    /*
    =====================================
    PERSONAL DETAILS
    =====================================
    */

    gender: {
      type: String,
      enum: [
        "Male",
        "Female",
        "Other",
      ],
    },

    dob: Date,

    bloodGroup: {
      type: String,
      enum: [
        "A+",
        "A-",
        "B+",
        "B-",
        "AB+",
        "AB-",
        "O+",
        "O-",
      ],
    },

    category: {
      type: String,
      enum: [
        "General",
        "OBC",
        "SC",
        "ST",
        "EWS",
      ],
      default: "General",
    },

    /*
    =====================================
    PARENT DETAILS
    =====================================
    */

    fatherName: {
      type: String,
      trim: true,
      default: "",
    },

    motherName: {
      type: String,
      trim: true,
      default: "",
    },

    guardianPhone: {
      type: String,
      default: "",
    },

    guardianEmail: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      default: "",
    },

    /*
    =====================================
    ADDRESS
    =====================================
    */

    address: {
      street: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      district: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      pincode: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "India",
      },
    },

    /*
    =====================================
    ADMISSION
    =====================================
    */

    admissionDate: {
      type: Date,
      default: Date.now,
    },

    admissionType: {
      type: String,
      enum: [
        "Regular",
        "Lateral Entry",
      ],
      default: "Regular",
    },

    /*
    =====================================
    CLOUDINARY IMAGE
    =====================================
    */

    profileImage: {
      public_id: {
        type: String,
        default: "",
      },

      url: {
        type: String,
        default: "",
      },
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

    /*
    =====================================
    AUDIT
    =====================================
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

    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

/*
====================================
INDEXES
====================================
*/

studentSchema.index({
  department: 1,
  semester: 1,
});

studentSchema.index({
  batch: 1,
});

studentSchema.index({
  isActive: 1,
});



studentSchema.index({
  name: "text",
  rollNumber: "text",
  admissionNumber: "text",
});

/*
====================================
VIRTUAL AGE
====================================
*/

studentSchema.virtual("age").get(function () {
  if (!this.dob) return null;

  return Math.floor(
    (Date.now() - this.dob.getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
  );
});

/*
====================================
FULL ADDRESS
====================================
*/

studentSchema.virtual("fullAddress").get(function () {
  return [
    this.address.street,
    this.address.city,
    this.address.district,
    this.address.state,
    this.address.pincode,
    this.address.country,
  ]
    .filter(Boolean)
    .join(", ");
});

/*
====================================
PRE SAVE
====================================
*/

studentSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }

  if (this.rollNumber) {
    this.rollNumber =
      this.rollNumber.toUpperCase();
  }

  if (this.admissionNumber) {
    this.admissionNumber =
      this.admissionNumber.toUpperCase();
  }

  next();
});

module.exports = mongoose.model(
  "Student",
  studentSchema
);