import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const connectDB = async () => {
  try {
    // Use the MONGO_URI environment variable from the .env file
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err); // Error handling
    process.exit(1);
  }
};

export default connectDB; // Export the connectDB function
