import { model, Schema } from "mongoose";

const loginSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
  },
  {
    timestamps: true,
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

const loginModel = model("login", loginSchema);

export default loginModel;
