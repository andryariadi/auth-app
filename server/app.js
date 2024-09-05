import express from "express";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDB.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! bree");
});

app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectToDB();
  console.log(`Example app listening on port ${port}`);
});
