import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { connectRedis, redisClient } from "./config/redis.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

connectDB();
connectRedis();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Portfolio API running");
});

app.get("/health", (req, res) => {
  try {
    const isDbHealthy = mongoose.connection.readyState === 1;
    const isCacheHealthy = redisClient.isReady;
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
      services: {
        database: isDbHealthy ? "healthy" : "unhealthy",
        cache: isCacheHealthy ? "healthy" : "unhealthy",
      },
    };

    if (!isDbHealthy || !isCacheHealthy) {
      return res.status(503).json(healthcheck);
    }

    res.status(200).json(healthcheck);
  } catch (error) {
    console.log("Health Check Failed:", error);
    res.status(500).json({
      message: "CRITICAL SYSTEM FAILURE",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
