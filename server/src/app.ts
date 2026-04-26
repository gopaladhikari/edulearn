import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/api-responses.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

const app = express();

// Body parser

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "device-remember-token",
      "Access-Control-Allow-Origin",
      "Origin",
      "Accept",
    ],
  })
);

// Logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// 404
app.use((_req, res) => {
  res.status(404).json(new ApiError(404, "Api route not found"));
});

// Error Middleware

app.use(errorHandler);

export { app };
