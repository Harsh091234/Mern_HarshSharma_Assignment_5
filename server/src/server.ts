import express, { type Request, type Response } from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import path from "node:path";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? true // same-origin in prod (Render)
        : process.env.CLIENT_URL,
    credentials: true,
  })
);
  

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
