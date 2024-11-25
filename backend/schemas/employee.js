import { model, Schema } from "mongoose";
import counterModel from "./counter.js";

const employeeSchema = Schema(
  {
    _id: { type: Number },
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    mobile: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    course: {
      type: Array,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

employeeSchema.pre("save", async function (next) {
  const employee = this;

  if (!employee._id) {
    try {
      const counter = await counterModel.findOneAndUpdate(
        { _id: "employee" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      employee._id = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const employeeModel = model("employee", employeeSchema);

export default employeeModel;
