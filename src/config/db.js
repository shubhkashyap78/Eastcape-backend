const mongoose = require("mongoose");

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) return true;

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("MONGO_URI is not set.");
    return false;
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });
    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.error("MongoDB connection failed", err.message);
    return false;
  }
};

module.exports = { connectDb };
