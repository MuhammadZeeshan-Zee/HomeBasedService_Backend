import mongoose, { Schema } from "mongoose";
const bookSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    serviceName: {
      type: String,
      required: true,
    },
    serviceArea: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mapAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:"pending"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Referencing User model
      ref: 'User', // Reference to the User model
    }
  },
    { timestamps: true }
  );
  export const Book = mongoose.model("Book", bookSchema);