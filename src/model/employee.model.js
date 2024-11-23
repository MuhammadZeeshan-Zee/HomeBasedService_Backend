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
    location:{
      type:String,
      require:true
    },
  
  },
  { timestamps: true }
);
export const Employee = mongoose.model("Employee", employeeSchema);