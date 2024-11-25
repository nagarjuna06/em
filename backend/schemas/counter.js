import { model, Schema } from "mongoose";

const counterSchema = Schema({
  _id: String,
  seq: { type: Number, default: 0 },
});

const counterModel = model("counter", counterSchema);

export default counterModel;
