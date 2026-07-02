const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "faculty", "student"],
      default: "student",
      
    },

    avatar: {
      public_id: String,
      url: String,
    },

    isActive: {
      type: Boolean,
      default: true,
      
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: String,

    emailVerificationExpire: Date,

    resetPasswordToken: String,

    resetPasswordExpire: Date,

    refreshToken: String,

    passwordChangedAt: Date,

    loginAttempts: {
      type: Number,
      default: 0,
    },

    lockUntil: Date,

    lastLogin: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
===================================
Indexes
===================================
*/



userSchema.index({
  role: 1,
});

userSchema.index({
  isActive: 1,
});

/*
===================================
Hash Password
===================================
*/

/*
===================================
Hash Password
===================================
*/

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(12);

  this.password = await bcrypt.hash(this.password, salt);

  this.passwordChangedAt = new Date();
});

/*
===================================
Compare Password
===================================
*/

userSchema.methods.matchPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

/*
===================================
Access Token
===================================
*/

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "15m",
    }
  );
};

/*
===================================
Refresh Token
===================================
*/

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn:
        process.env.JWT_REFRESH_EXPIRE || "30d",
    }
  );
};

/*
===================================
Reset Password Token
===================================
*/

userSchema.methods.getResetPasswordToken = function () {
  const token = crypto
    .randomBytes(32)
    .toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordExpire =
    Date.now() + 15 * 60 * 1000;

  return token;
};

/*
===================================
Email Verification Token
===================================
*/

userSchema.methods.generateEmailVerificationToken =
  function () {
    const token = crypto
      .randomBytes(32)
      .toString("hex");

    this.emailVerificationToken =
      crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    this.emailVerificationExpire =
      Date.now() + 24 * 60 * 60 * 1000;

    return token;
  };

/*
===================================
Account Lock
===================================
*/

userSchema.virtual("isLocked").get(function () {
  return !!(
    this.lockUntil &&
    this.lockUntil > Date.now()
  );
});

/*
===================================
Hide Sensitive Data
===================================
*/

userSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;
  delete obj.refreshToken;
  delete obj.resetPasswordToken;
  delete obj.emailVerificationToken;

  return obj;
};

module.exports = mongoose.model(
  "User",
  userSchema
);