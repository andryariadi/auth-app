import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/connectToDB.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectToDB();
  console.log(`Server running on port ${port} nih bre!`);
});
