import mongoose from "mongoose";
async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(`${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`${process.env.MONGODB_URI}`);
    console.log(`connecttion failed ${error}`);
    process.exit(1);
  }
}
export default connectDB;
