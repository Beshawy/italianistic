const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables");
    return;
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("mongodb Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;