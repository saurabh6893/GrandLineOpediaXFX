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
      `Server is running on ${process.env.PORT}`;
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
