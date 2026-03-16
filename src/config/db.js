const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return true;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI is not set.");
    return false;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri);
    isConnected = true;
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed", err);
    return false;
  }
};

module.exports = { connectDb };
