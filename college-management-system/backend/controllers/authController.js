const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

/*
==========================================================
Generate Access Token
==========================================================
*/

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || "15m",
    }
  );
};

/*
==========================================================
Generate Refresh Token
==========================================================
*/

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn:
        process.env.JWT_REFRESH_EXPIRE || "30d",
    }
  );
};

/*
==========================================================
Send Tokens
==========================================================
*/

const sendTokenResponse = async (
  user,
  statusCode,
  message,
  res
) => {
  const accessToken =
    generateAccessToken(user);

  const refreshToken =
    generateRefreshToken(user);

  user.refreshToken = refreshToken;

  user.lastLogin = new Date();

  user.loginAttempts = 0;

  user.lockUntil = undefined;

  await user.save({
    validateBeforeSave: false,
  });

  const cookieOptions = {
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "strict",
  };

  res.cookie(
    "token",
    accessToken,
    {
      ...cookieOptions,
      maxAge:
        15 *
        60 *
        1000,
    }
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    {
      ...cookieOptions,
      maxAge:
        30 *
        24 *
        60 *
        60 *
        1000,
    }
  );

  res.status(statusCode).json({
    success: true,
    message,
    token: accessToken,
    refreshToken,
    user,
  });
};

/*
==========================================================
Register
==========================================================
*/

exports.register = async (
  req,
  res
) => {
  try {
    let {
      name,
      email,
      password,
      role,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, Email and Password are required.",
      });
    }

    email = email
      .trim()
      .toLowerCase();

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "Email already registered.",
      });
    }

    const user =
      await User.create({
        name,
        email,
        password,
        role,
      });

    return sendTokenResponse(
      user,
      201,
      "Registration Successful",
      res
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Registration failed.",
    });
  }
};

/*
==========================================================
Login
==========================================================
*/

exports.login = async (
  req,
  res
) => {
  try {
    let {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and Password are required.",
      });
    }

    email = email
      .trim()
      .toLowerCase();

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    if (
      user.lockUntil &&
      user.lockUntil >
        Date.now()
    ) {
      return res.status(423).json({
        success: false,
        message:
          "Account temporarily locked. Try again later.",
      });
    }

    const isMatch =
      await user.matchPassword(
        password
      );

    if (!isMatch) {
      user.loginAttempts += 1;

      if (
        user.loginAttempts >=
        5
      ) {
        user.lockUntil =
          Date.now() +
          30 *
            60 *
            1000;
      }

      await user.save({
        validateBeforeSave:
          false,
      });

      return res.status(401).json({
        success: false,
        message:
          "Invalid Credentials",
      });
    }

    return sendTokenResponse(
      user,
      200,
      "Login Successful",
      res
    );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Login failed.",
    });
  }
};

/*
==========================================================
Logout
==========================================================
*/

exports.logout = async (
  req,
  res
) => {
  try {
    if (req.user) {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          refreshToken:
            null,
        }
      );
    }

    res.clearCookie(
      "token"
    );

    res.clearCookie(
      "refreshToken"
    );

    return res.status(200).json({
      success: true,
      message:
        "Logged out successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Logout failed.",
    });
  }
};

/*
==========================================================
Refresh Access Token
==========================================================
*/

exports.refreshToken = async (req, res) => {
  try {
    const token =
      req.cookies?.refreshToken ||
      req.body.refreshToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.refreshToken !== token) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }

    return sendTokenResponse(
      user,
      200,
      "Token refreshed successfully.",
      res
    );
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Refresh token expired.",
    });
  }
};

/*
==========================================================
Current Logged In User
==========================================================
*/

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
};

/*
==========================================================
Update Profile
==========================================================
*/

exports.updateProfile = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
    } = req.body;

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (name)
      user.name = name;

    if (
      email &&
      email !== user.email
    ) {
      const exists =
        await User.findOne({
          email,
        });

      if (exists) {
        return res.status(400).json({
          success: false,
          message:
            "Email already in use.",
        });
      }

      user.email =
        email.toLowerCase();
    }

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Profile updated successfully.",
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Unable to update profile.",
    });
  }
};

/*
==========================================================
Change Password
==========================================================
*/

exports.changePassword =
  async (
    req,
    res
  ) => {
    try {
      const {
        currentPassword,
        newPassword,
      } = req.body;

      if (
        !currentPassword ||
        !newPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Current and new password are required.",
        });
      }

      const user =
        await User.findById(
          req.user._id
        ).select("+password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found.",
        });
      }

      const isMatch =
        await user.matchPassword(
          currentPassword
        );

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message:
            "Current password is incorrect.",
        });
      }

      if (
        currentPassword ===
        newPassword
      ) {
        return res.status(400).json({
          success: false,
          message:
            "New password must be different from current password.",
        });
      }

      user.password =
        newPassword;

      user.passwordChangedAt =
        new Date();

      user.refreshToken =
        null;

      await user.save();

      res.clearCookie(
        "token"
      );

      res.clearCookie(
        "refreshToken"
      );

      return res.status(200).json({
        success: true,
        message:
          "Password changed successfully. Please login again.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to change password.",
      });
    }
  };

  /*
==========================================================
Forgot Password
==========================================================
*/

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const resetToken =
      user.getResetPasswordToken();

    await user.save({
      validateBeforeSave: false,
    });

    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const message = `
        <h2>Password Reset</h2>

        <p>You requested a password reset.</p>

        <a href="${resetURL}">
            Reset Password
        </a>

        <p>This link expires in 15 minutes.</p>
    `;

    try {
      await sendEmail(
        user.email,
        "Password Reset",
        message
      );

      return res.status(200).json({
        success: true,
        message:
          "Password reset link sent successfully.",
      });
    } catch (error) {
      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save({
        validateBeforeSave: false,
      });

      return res.status(500).json({
        success: false,
        message:
          "Unable to send email.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Forgot password failed.",
    });
  }
};

/*
==========================================================
Reset Password
==========================================================
*/

exports.resetPassword = async (
  req,
  res
) => {
  try {
    const hashedToken =
      crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user =
      await User.findOne({
        resetPasswordToken:
          hashedToken,
        resetPasswordExpire: {
          $gt: Date.now(),
        },
      }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Reset token is invalid or expired.",
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message:
          "Password is required.",
      });
    }

    user.password =
      req.body.password;

    user.resetPasswordToken =
      undefined;

    user.resetPasswordExpire =
      undefined;

    user.refreshToken =
      undefined;

    await user.save();

    res.clearCookie("token");

    res.clearCookie(
      "refreshToken"
    );

    return res.status(200).json({
      success: true,
      message:
        "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to reset password.",
    });
  }
};

/*
==========================================================
Verify Email
==========================================================
*/

exports.verifyEmail = async (
  req,
  res
) => {
  try {
    const hashedToken =
      crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user =
      await User.findOne({
        emailVerificationToken:
          hashedToken,
        emailVerificationExpire:
          {
            $gt: Date.now(),
          },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Verification link expired.",
      });
    }

    user.emailVerified =
      true;

    user.emailVerificationToken =
      undefined;

    user.emailVerificationExpire =
      undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to verify email.",
    });
  }
};

/*
==========================================================
Resend Verification Email
==========================================================
*/

exports.resendVerification =
  async (
    req,
    res
  ) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found.",
        });
      }

      if (
        user.emailVerified
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Email already verified.",
        });
      }

      const token =
        user.generateEmailVerificationToken();

      await user.save({
        validateBeforeSave:
          false,
      });

      const verifyURL =
        `${process.env.CLIENT_URL}/verify-email/${token}`;

      const message = `
            <h2>Email Verification</h2>

            <p>Please verify your email.</p>

            <a href="${verifyURL}">
                Verify Email
            </a>
        `;

      await sendEmail(
        user.email,
        "Verify Email",
        message
      );

      return res.status(200).json({
        success: true,
        message:
          "Verification email sent.",
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Unable to send verification email.",
      });
    }
  };
