import { Redis } from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) throw new Error("REDIS_URL is not defined");

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  keyPrefix: "edulearn:",
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", console.error);

export { redis };
