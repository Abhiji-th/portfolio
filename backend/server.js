import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio API running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
