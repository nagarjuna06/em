import employeeModel from "../schemas/employee.js";
import cloudinaryService from "../services/cloudinary.js";

export const createEmployeeController = async (req, res) => {
  try {
    await employeeModel.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        data: {
          path: "email",
        },
        message: "Employee with the same email already exists",
      });
    }

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

  const imageUrl = await cloudinaryService.upload(image, url);

  return res.json({
    success: true,
    data: {
      url: imageUrl,
    },
  });
};

export const getEmployeesController = async (req, res) => {
  let { q = "", page, orderBy = "_id", order = "ASC", limit } = req.query;

  const query = {
    $or: [
      {
        email: new RegExp(q, "i"),
      },
      {
        name: new RegExp(q, "i"),
      },
      {
        mobile: new RegExp(q, "i"),
      },
    ],
  };
  const sort = order == "DESC" ? -1 : 1;

  page = parseInt(page) || 1;

  limit = parseInt(limit) || 10;

  const skip = limit * page - limit;

  const employees = await employeeModel
    .find(query)
    .sort({ [orderBy]: sort })
    .limit(limit)
    .skip(skip);

  const total = await employeeModel.countDocuments(query);

  const pages = Math.round(total / limit);

  return res.status(200).json({
    success: true,
    data: employees,
    meta: {
      total,
      pages,
      page,
      limit,
    },
  });
};

export const updateEmployeesController = async (req, res) => {
  try {
    await employeeModel.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        data: {
          path: "email",
        },
        message: "Employee with the same email already exists",
      });
    }
  }
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
