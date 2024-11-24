import { User } from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
export const createAdmin = asyncHandler(async (req, res) => {
  try {
    const existingAdmin = await User.findOne({
      email: "admin123@gmail.com",
    });
    if (!existingAdmin) {
      const createdNewAdmin = new User({
        firstName: "muhammad",
        lastName: "Zeeshan",
        email: "admin123@gmail.com",
        phoneNumber: "037452865",
        password: "Admin*123",
        role: "admin",
      });
      await createdNewAdmin.save();
      console.log("Admin Created Successfully");
    } else {
      console.log("Admin already exist");
    }
  } catch (error) {
    throw new ApiError(400, "All fields are required");
  }
});
