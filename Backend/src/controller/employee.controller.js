import { Employee } from "../model/employee.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addEmployee = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { firstname, lastName, email, phoneNumber, category, address } =
    req.body;
  if (
    [firstname, lastName, email, phoneNumber, category, address].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const extistedSame =await Employee.find({email,category});
  console.log("extistedSame",extistedSame);
  
  const employee = await Employee.create({
    firstname,
    lastName,
    email,
    phoneNumber,
    category,
    address,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, employee, "Employee Added Successfully"));
});
const readallEmployee = async (req, res) => {
  const allEmployee = await Employee.find();
  if (!allEmployee.length) {
    throw new ApiError("Not Employees are yet to Fetched");
  }
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        allEmployee,
        "All Employees are fetched Successfully"
      )
    );
};
const updateEmployee = async (req, res) => {
  const { firstname, lastName, email, phoneNumber, category, address } =
    req.body;
  if (
    [lastName, email, phoneNumber, category, firstname, address].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const id = req.params.id;
  const updateEmployee = await Employee.findByIdAndUpdate(
    { _id: id },
    req.body,
    {
      new: true,
    }
  );
  return res
    .status(201)
    .json(
      new ApiResponse(200, updateEmployee, "Employee Updated Successfully")
    );
};
const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  const deleteEmployee = await Employee.findByIdAndDelete({ _id: id });
  console.log("deleteEmployee", deleteEmployee);

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        {},
        `Employee ${deleteEmployee.firstname} ${deleteEmployee.lastName} deleted successfully`
      )
    );
};
const employeeCount = async (req, res) => {
  const count = await Employee.countDocuments({});
  return res
    .status(201)
    .json(new ApiResponse(200, count, "Employee Added Successfully"));
};
export {
  addEmployee,
  readallEmployee,
  updateEmployee,
  deleteEmployee,
  employeeCount,
};
