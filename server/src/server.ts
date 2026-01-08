import express, { type Request, type Response } from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
