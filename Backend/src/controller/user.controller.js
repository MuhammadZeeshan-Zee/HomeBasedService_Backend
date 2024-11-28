import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { SendEmailUtil } from "../utils/emailSender.js";
import mongoose from "mongoose";
import { OTP } from "../model/otp.model.js";

const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(400, "You are already registered");
  }
  const existedOTP = await OTP.findOne({ email });
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 300000;
  console.log("existedOTP", existedOTP);

  if (!existedOTP) {
    const user = await OTP.create({
      email,
      otp,
      otpExpires,
    });
    console.log("user", user);
    const body = {
      from: `${process.env.EMAIL_TITLE_SMTP} <${process.env.EMAIL_ID_SMTP}>`,
      to: email,
      subject: "Sign Up",
      html: `<h2>Thanks for using Server At Door</h2>
      <p style="font-size: 16px;">【Server At Door】Dear user, please check your verification code as below. If this operation is not submited from yourself, please ignore this message!</p>
      <p style="font-size: 16px;">Verification code：</p>
      <p style="font-size: 16px;">${user.otp}</p>
      <p style="font-size: 16px;">Thank you for your support. Please contact us if you have any questions.</p>
      <p>©2024 All rights reserved.</p>
      `,
    };
    const message = "Please check your email to verify!";

    try {
      await SendEmailUtil(body);
      res.status(200).json(new ApiResponse(200, {}, message));
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new ApiError(500, "Error sending email");
    }
  }
  if (existedOTP) {
    existedOTP.otp = otp;
    existedOTP.otpExpires = otpExpires;
    await existedOTP.save();
    console.log("existedOTP", existedOTP);

    // const savedUser = await user.save({ validateBeforeSave: false });
    // console.log("savedUser", savedUser);
    const body = {
      from: `${process.env.EMAIL_TITLE_SMTP} <${process.env.EMAIL_ID_SMTP}>`,
      to: email,
      subject: "Sign Up",
      html: `<h2>Thanks for using Server At Door</h2>
          <p style="font-size: 16px;">【Server At Door】Dear user, please check your verification code as below. If this operation is not submited from yourself, please ignore this message!</p>
          <p style="font-size: 16px;">Verification code：</p>
          <p style="font-size: 16px;">${existedOTP.otp}</p>
          <p style="font-size: 16px;">Thank you for your support. Please contact us if you have any questions.</p>
          <p>©2024 All rights reserved.</p>
          `,
    };
    const message = "Please check your email to verify!";

    try {
      await SendEmailUtil(body);
      res.status(200).json(new ApiResponse(200, {}, message));
    } catch (error) {
      console.error("Error sending email:", error.message);
      throw new ApiError(500, "Error sending email");
    }
  }
});
const verifyOTPAndRegister = asyncHandler(async (req, res) => {
  const { email, otp, password, firstName, lastName, phoneNumber } = req.body;
  if (
    [email, otp, password, firstName, lastName, phoneNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const otpVerifier = await OTP.findOne({ email, otp });
  if (!otpVerifier || otpVerifier.otpExpires < Date.now()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  otpVerifier.otp = undefined;
  otpVerifier.otpExpires = undefined;
  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    avtar: "",
  });
  await otpVerifier.save();
  await user.save();
  console.log("otpVerifier", otpVerifier);
  console.log("user", user);

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("createdUser", createdUser);

  res
    .status(200)
    .json(
      new ApiResponse(200, createdUser, "OTP verified and User Registered")
    );
});
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;
  if (
    [firstName, lastName, email, phoneNumber, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  // if (!email.includes("@")) {
  //   throw new ApiError(400, "Please enter valid email");
  // }
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User is Already exist in database");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    avtar: "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.gentertaeAccessToken();
    const refreshToken = user.gentertaeRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while genterating access and refresh Token"
    );
  }
};
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "Please enter valid email");
  }
  const user = await User.findOne({ email });
  console.log("user", user);
  if (!user) {
    throw new ApiError(404, "User is not exist in database");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("isPasswordValid", isPasswordValid);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials Invalid password");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("loggedInUser", loggedInUser);
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggedIn Successfully"
      )
    );
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logout Successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "unauthorized request refresh token not found");
  }
  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token or already used");
  }
  if (incomingRefreshToken !== user.refreshToken) {
    throw new ApiError(401, "unauthorized request");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "access token refreshed successfully"
      )
    );
});
const changePassword = asyncHandler(async (req, res) => {
  const { newPassword, oldPassword, confirmPassword } = req.body;
  // if(!newPassword && !oldPassword && !confirmPassword) return
  if (newPassword !== confirmPassword) {
    throw new ApiError("new  password and confirm password not matched");
  }
  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password changed successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully"));
});
const updateUserDetails = asyncHandler(async (req, res) => {
  console.log("req.user", req.user);

  const { firstName, lastName, phoneNumber } = req.body;
  if (!firstName || !lastName || !phoneNumber) {
    throw new ApiError("All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        firstName,
        lastName,
        phoneNumber,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details updated successfully"));
});
const updateUserAvatar = asyncHandler(async (req, res) => {
  console.log(1);
  let avtarLocalPath;
  // if (files && Array.isArray(files.avatar) && files.avatar.length > 0) {
  avtarLocalPath = req.files?.avatar[0]?.path;
  // }

  if (!avtarLocalPath) {
    throw new ApiError("Avtar image is missing");
  }
  const avtarCloud = await uploadOnCloudinary(avtarLocalPath);
  console.log("avtarCloud", avtarCloud);

  if (!avtarCloud.url) {
    throw new ApiError("Error while uploading Avtar on cloudinary");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avtar: avtarCloud.url,
      },
    },
    { new: true }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated Successfully"));
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError("You are not registered");
  }
  console.log("user", user);

  user.otp = Math.floor(1000 + Math.random() * 9000).toString();
  user.otpExpires = Date.now() + 300000;
  const savedUser = await user.save({ validateBeforeSave: false });
  console.log("savedUser", savedUser);
  const body = {
    from: `${process.env.EMAIL_TITLE_SMTP} <${process.env.EMAIL_ID_SMTP}>`,
    to: email,
    subject: "Authentication",
    html: `
    <html>
      <head>
        <style>
          /* General resets and styling */
          body, table, td, a { 
            -webkit-text-size-adjust: 100%; 
            -ms-text-size-adjust: 100%; 
          }
          table, td { 
            border-collapse: collapse !important; 
          }
          img { 
            height: auto; 
            line-height: 100%; 
            text-decoration: none; 
            border: 0; 
            outline: none; 
          }

          /* Responsive layout */
          @media screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              padding: 20px !important;
            }
            .email-body {
              padding: 20px !important;
            }
          }
        </style>
      </head>
      <body style="background-color: #f4f4f4; margin: 0; padding: 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <!-- Header -->
          <tr>
            <td bgcolor="#333333" align="center" style="padding: 40px;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Authentication Required</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="#ffffff" align="center" style="padding: 0 10px;">
              <table class="email-container email-body" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; padding: 40px; border-radius: 8px;">
                <tr>
                  <td align="left" style="font-size: 16px; font-family: Arial, sans-serif; color: #333333;">
                    <h2 style="margin: 0; font-size: 22px;">Hello ${email},</h2>
                    <p style="margin: 16px 0;">Your OTP is <strong style="color: #ff5a5f; font-size: 18px;">${
                      user.otp
                    }</strong></p>
                    <p style="margin: 16px 0; color: #666666;">If you did not initiate this request, please contact us immediately at <a href="mailto:eg@.com" style="color: #1a82e2; text-decoration: none;">eg@.com</a>.</p>
                    <p style="margin: 40px 0 0; font-weight: bold; color: #555555;">Thank you,</p>
                    <p style="margin: 0; color: #555555;">Developer Team</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#333333" align="center" style="padding: 20px;">
              <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px;">
                <tr>
                  <td align="center" style="color: #ffffff; font-size: 14px; font-family: Arial, sans-serif;">
                    <p style="margin: 0;">&copy; ${new Date().getFullYear()} Developer Team. All rights reserved.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `,
  };
  const message = "Please check your email to verify!";

  try {
    await SendEmailUtil(body);
    res.status(200).json(new ApiResponse(200, {}, message));
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new ApiError(500, "Error sending email");
  }
});
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });
  if (!user || user.otpExpires < Date.now())
    throw new ApiError(400, "Invalid or expired OTP");

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  res.status(200).json(new ApiResponse(200, { email }, "OTP verified"));
});
const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully"));
});
const updateUserAction = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("id", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid user ID format");
  }
  const user = await User.findById(id);
  const updateData = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        action: !user.action,
      },
    },
    {
      new: true,
    }
  );
  if (!updateData) {
    throw new ApiError(400, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updateData, "password updated successfully"));
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users.length) {
    throw new ApiError(400, "Users not not enough to fectch");
  }
  const filterUser = users.filter((user) => user.role !== "admin");
  console.log("filterUser", filterUser);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        filterUser,
        count: users.filter((user) => user.role !== "admin").length,
      },
      "All Users retrieved successfully"
    )
  );
});
export {
  sendOTP,
  verifyOTPAndRegister,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changePassword,
  getCurrentUser,
  updateUserDetails,
  updateUserAvatar,
  forgotPassword,
  verifyOTP,
  resetPassword,
  updateUserAction,
  getAllUsers,
};
