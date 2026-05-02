import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/api-responses.js";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import helmet from "helmet";
import hpp from "hpp";
import passport from "passport";
import { LocalStrategy } from "./strategy/local.strategy.js";
import { JwtStrategy } from "./strategy/jwt.strategy.js";
import { arcjectProtection } from "./middlewares/arcjet.middleware.js";

const app = express();

// Proxy

app.set("trust proxy", true);

// passport

app.use(passport.initialize());
LocalStrategy(passport);
JwtStrategy(passport);

// Helmet
app.use(helmet());

// Arcject
app.use(arcjectProtection);

// Body parser

app.use(express.json({ limit: "10kb" }));
// app.use(mongoSanitize());
app.use(express.urlencoded({ limit: "10kb", extended: true }));
app.use(hpp());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: clientUrl,
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

// Routes

import { authRouter } from "./routes/auth.route.js";
import { healthCheckRouter } from "./routes/healthcheck.route.js";
import { userProfileRouter } from "./routes/user-profile.route.js";
import { clientUrl } from "./utils/constants.js";

app.use("/health", healthCheckRouter);

app.use("/api/v1/user", authRouter, userProfileRouter);

// 404
app.use((req, _res, next) => {
  next(new ApiError(404, `Api route not found: ${req.originalUrl}`));
});

// Error Middleware

app.use(errorHandler);

export { app };
