import mongoose, { Schema } from "mongoose";
const otpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    
  },
  { timestamps: true }
);


export const OTP = mongoose.model("OTP", otpSchema);
