
const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    /*
    =====================================
    BASIC INFORMATION
    =====================================
    */

    name: {
      type: String,
      required: [true, "Faculty name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Enter a valid email",
      ],
    },

    phone: {
      type: String,
      required: true,
      match: [
        /^[6-9]\d{9}$/,
        "Invalid phone number",
      ],
    },

    /*
    =====================================
    PROFESSIONAL DETAILS
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

    designation: {
      type: String,
      required: true,
      enum: [
        "Professor",
        "Associate Professor",
        "Assistant Professor",
        "HOD",
        "Lecturer",
        "Lab Assistant",
      ],
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    specialization: {
      type: String,
      default: "",
      trim: true,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    salary: {
      type: Number,
      default: 0,
      min: 0,
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

    maritalStatus: {
      type: String,
      enum: [
        "Single",
        "Married",
      ],
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

facultySchema.index({
  department: 1,
});



facultySchema.index({
  isActive: 1,
});

facultySchema.index({
  name: "text",
  employeeId: "text",
});

/*
====================================
AGE
====================================
*/

facultySchema.virtual("age").get(function () {
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

facultySchema.virtual("fullAddress").get(function () {
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

facultySchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase();
  }

  if (this.employeeId) {
    this.employeeId =
      this.employeeId.toUpperCase();
  }

  next();
});

module.exports = mongoose.model(
  "Faculty",
  facultySchema
);