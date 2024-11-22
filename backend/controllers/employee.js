import employeeModel from "../schemas/employee.js";
import cloudinaryService from "../services/cloudinary.js";

export const createEmployeeController = async (req, res) => {
  try {
    const employee = await employeeModel.create(req.body);

    return res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create employee",
    });
  }
};

export const uploadEmployeeImageController = async (req, res) => {
  const image = req.file;

  if (!image) {
    return res.status(400).json({
      success: false,
      message: "No image is provided",
    });
  }

  const url = req.body.url;

  if (url) {
    await cloudinaryService.delete(url);
  }

  const imageUrl = await cloudinaryService.upload(image);
  return res.json({
    success: true,
    data: {
      imageUrl,
    },
  });
};

export const getEmployeesController = async (req, res) => {
  const employees = await employeeModel.find();

  return res.status(200).json({
    success: true,
    data: employees,
  });
};

export const updateEmployeesController = async (req, res) => {
  const updatedEmployee = await employeeModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: updatedEmployee,
  });
};

export const deleteEmployeeController = async (req, res) => {
  const deletedEmployee = await employeeModel.findOneAndDelete({
    _id: req.params.id,
  });

  if (!deletedEmployee) {
    return res.status(404).json({
      success: false,
      message: "Employee not found",
    });
  }

  await cloudinaryService.delete(deletedEmployee.image);

  return res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
};
