import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";

dotenv.config({
  path: ".env",
});

async function startServer() {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });
    console.log(`${process.env.PORT}`);
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on ${process.env.PORT || 8000}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
