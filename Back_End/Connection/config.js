import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/youtube_Back_End"); /* mongoose connection and creating a collection youtube_Back_End */
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err); /* error handling incase of not connected to MongoDB */
    process.exit(1);
  }
};

export default connectDB; /* exporting connectDB function */
