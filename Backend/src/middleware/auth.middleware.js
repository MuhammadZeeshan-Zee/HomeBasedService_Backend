import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers.authorization.split(" ", 2)[1];

    // const AuthHeader = req.headers.authorization;
    // const token = AuthHeader.split(" ", 2)[1];
    // // console.log("token",req.header("Authorzation")?.replace("Bearer ", ""));
    // console.log("token",token);
    console.log("accessToken", accessToken);

    if (!accessToken) {
      throw new ApiError(401, "UnAuthorized request");
    }
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
