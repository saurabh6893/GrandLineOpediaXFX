import mongoose from "mongoose";

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`Database connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);
    console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
    process.exit(1);
  }
}

export default connectDB;
