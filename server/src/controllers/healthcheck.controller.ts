import { ApiResponse } from "@/utils/api-responses.js";
import type { Response, Request } from "express";
import { dbConnection } from "@/utils/connect-to-db.js";
import { redis } from "@/utils/redis.js";

const getReadyStatus = (number: number) => {
  switch (number) {
    case 0:
      return "Disconnected";
    case 1:
      return "Connected";
    case 2:
      return "Connecting";
    case 3:
      return "Disconnected";
    default:
      return "Unknown";
  }
};

export const healthCheck = async (_req: Request, res: Response) => {
  const dbStatus = dbConnection.getConnectionStatus();

  const pong = await redis.ping();

  const healthStatus = {
    status: "Ok",
    timestamps: new Date().toISOString(),
    services: {
      database: {
        status: dbStatus.isConnected ? "Connected" : "Disconnected",
        details: {
          ...dbStatus,
          readyStatus: getReadyStatus(dbStatus.isReady),
        },
      },
      server: {
        status: "Ok",
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },

      redis: {
        status: pong === "PONG" ? "Connected" : "Disconnected",
        message:
          pong === "PONG" ? "Redis is connected." : "Redis is disconnected",
      },
    },
  };

  const constHttpStatus =
    healthStatus.services.database.status === "Connected" ? 200 : 503;

  res
    .status(constHttpStatus)
    .json(new ApiResponse(constHttpStatus, "OK", healthStatus));
};
