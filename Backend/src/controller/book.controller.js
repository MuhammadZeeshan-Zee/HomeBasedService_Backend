import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../model/user.model.js";
import { Book } from "../model/book.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { SendEmailUtil } from "../utils/emailSender.js";
import mongoose from "mongoose";
const createbookService = asyncHandler(async (req, res) => {
  console.log("req.user ", req.user);
  console.log("req.body", req.body);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    serviceName,
    serviceArea,
    address,
    mapAddress,
  } = req.body;

  if (
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      serviceName,
      serviceArea,
      address,
      mapAddress,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const orderDetails = await Book.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    serviceName,
    serviceArea,
    address,
    mapAddress,
    status: "pending",
    user: req.user._id,
  });
  console.log("orderDetails", orderDetails);
  const user = await User.findOne({ email });
  const allBookedOrders = await Book.find({ email });
  console.log("allBookedOrders", allBookedOrders);

  user.orderList = allBookedOrders;
  await user.save();
  console.log("user", user);

  const body = {
    from: `${process.env.EMAIL_TITLE_SMTP} <${process.env.EMAIL_ID_SMTP}>`,
    to: email,
    subject: "Greetings",
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
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-family: Arial, sans-serif;">Welcome to Our Service!</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td bgcolor="#ffffff" align="center" style="padding: 0 10px;">
              <table class="email-container email-body" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; padding: 40px; border-radius: 8px;">
                <tr>
                  <td align="left" style="font-size: 16px; font-family: Arial, sans-serif; color: #333333;">
                    <h2 style="margin: 0; font-size: 22px;">Hello ${firstName} ${lastName},</h2>
                    <p style="margin: 16px 0;">Thank you for placing an order with us! We appreciate your trust and support.</p>
                    <p style="margin: 16px 0;">Stay tuned with us for updates on your order and more exciting offers!</p>
                    <p style="margin: 16px 0; color: #666666;">If you did not initiate this request, please contact us immediately at <a href="mailto:wahabnadeem311@gmail.com" style="color: #1a82e2; text-decoration: none;">wahabnadeem311@gmail.com</a>.</p>
                    <p style="margin: 40px 0 0; font-weight: bold; color: #555555;">Best Regards,</p>
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
  const message = "Order placed successfully!";
  try {
    await SendEmailUtil(body);
    res.status(200).json(new ApiResponse(200, orderDetails, message));
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new ApiError(500, "Error sending email");
  }
});
const bookedHistory = asyncHandler(async (req, res) => {
  const email = req.user.email;
  console.log("email", email);

  const orderHistory = await Book.find({ email });
  console.log("orderHistory", orderHistory);

  res
    .status(200)
    .json(
      new ApiResponse(200, orderHistory, "order history fetched successfully")
    );
});
const getAllBookedOrders = asyncHandler(async (req, res) => {
  const bookedOrders = await Book.find(); // Fetch all booked orders from the database
  console.log("!bookedOrders.length", !bookedOrders.length);

  if (!bookedOrders.length) {
    throw new ApiError("Not orders yet to Fetched");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { bookedOrders, count: bookedOrders.length },
        "All booked orders retrieved successfully"
      )
    );
});
const updateOrderStatus = asyncHandler(async (req, res) => {
  console.log("req.params.id", req.params.id);
  console.log("req.body.status", req.body.status);

  const id = req.params.id;
  // Validate if the ID is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(401, "Invalid order ID format");
  }
  const updateData = await Book.findByIdAndUpdate(
    id,
    {
      $set: {
        status: req.body.status,
      },
    },
    {
      new: true,
    }
  );
  console.log("updateData", updateData);

  res
    .status(200)
    .json(
      new ApiResponse(200, updateData, "order status updated successfully")
    );
});

export {
  createbookService,
  getAllBookedOrders,
  updateOrderStatus,
  bookedHistory,
};
