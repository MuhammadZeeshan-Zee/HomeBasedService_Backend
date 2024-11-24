import mongoose, { Schema } from "mongoose";
const employeeSchema = new Schema(
  {
    firstname: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    address:{
      type:String,
      require:true
    },
    assign:{
      type:Boolean,
      default:false,
      requrired:true
    },
    orderList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);
export const Employee = mongoose.model("Employee", employeeSchema);