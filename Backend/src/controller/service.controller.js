import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { SendEmailUtil } from "../utils/emailSender.js";
import mongoose from "mongoose";
import { Service } from "../model/services.model.js";

const addService = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);

  const { name, description } = req.body;
  if ([name, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const avtarLocalPath = req.files?.image[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const responseAvatar = await uploadOnCloudinary(avtarLocalPath);

  if (!responseAvatar) {
    throw new ApiError(
      400,
      "Image is not uploaded yet upload this again server" //server issue
    );
  }

  const service = await Service.create({
    name,
    description,
    image: responseAvatar.url,
  });

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Service Added Successfully"));
});
const readService = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const service = await Service.findById({ _id: id });
  if (!service) {
    throw new ApiError(400, "invalid id");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Service Fetched Successfully"));
});
const readAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find({});
  if (!services.length) {
    throw new ApiError(400, "not enough services to fetched");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { services, count: services.length },
        "Fetched All Services Successfully"
      )
    );
});
const updateService = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { name, description } = req.body;
  if ([name, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const id = req.params.id;
  const avtarLocalPath = req.files?.image[0]?.path;

  if (!avtarLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const responseAvatar = await uploadOnCloudinary(avtarLocalPath);

  if (!responseAvatar) {
    throw new ApiError(
      400,
      "Image is not uploaded yet upload this again server" //server issue
    );
  }

  const service = await Service.findByIdAndUpdate(
    id,
    {
      $set: {
        name,
        description,
        image: responseAvatar.url,
      },
    },
    { new: true }
  );
  if (!service) {
    throw new ApiError(400, "Invalid Id");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Update Service Successfully"));
});
const deleteService = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const service = await Service.findByIdAndDelete({ _id: id });
  if (!service) {
    throw new ApiError(400, "Invalid Id");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, service, "Delete Service Successfully"));
});
export {
  addService,
  readService,
  readAllServices,
  updateService,
  deleteService,
};
