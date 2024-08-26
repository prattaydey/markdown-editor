import express from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
// import fileRoutes from "./routes/fileRoutes.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "50mb" })); // to parse JSON data in req.body
app.use(express.urlencoded({extended: true})); // to parse form data in the req.body
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes)
// app.use("/api/files", fileRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
