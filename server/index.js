import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js"
import videoRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"


const app = express();
dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB)
    .then(()=> {
       console.log("Connected to mongodb database");
    })
    .catch((err) => {
      throw err;
    })
}; 

app.use(cookieParser())
app.use(express.json())
app.use(cors());
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/videos", videoRoutes)
app.use("/api/comments", commentRoutes)

app.use((err, req,res,  next) => {
  const status = err.status || 500;
  const message = err.message || "Internal server error";
  return res.status(status).json({
    success: false,
    status,
    message,
  })
});
app.listen(8800, ()=> {
  connect();
  console.log("Server is running on 8800");
});