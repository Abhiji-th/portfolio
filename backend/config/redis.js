import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (error) => console.log("Redis Client Error", error));
redisClient.on("connect", () => console.log("Redis Connected..."));

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log(`Redis Connection failed: ${error.message}`);
  }
};

export { redisClient, connectRedis };
