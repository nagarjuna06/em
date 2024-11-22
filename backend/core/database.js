import mongoose from "mongoose";
import vars from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(vars.databaseUrl);
    console.log("DB connected successfully!");
  } catch (error) {
    console.log("Error connecting to database", error.message);
  }
};

export default connectDB;
