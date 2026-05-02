import arcjet, {
  shield,
  detectBot,
  tokenBucket,
  protectSignup,
  slidingWindow,
  type ArcjetDecision,
} from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/api-responses.js";
import { findIp } from "@arcjet/ip";

const signUpProtection = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    protectSignup({
      email: {
        mode: "LIVE",
        deny: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },

      bots: {
        mode: "LIVE",
        allow: ["POSTMAN"],
      },

      rateLimit: {
        mode: "LIVE",
        characteristics: ["ip"],
        interval: "1m",
        max: 5,
      },
    }),
  ],
});

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "POSTMAN"],
    }),

    tokenBucket({
      mode: "LIVE",
      refillRate: 50,
      interval: 60,
      characteristics: ["ip"],
      capacity: 100,
    }),

    slidingWindow({
      mode: "LIVE",
      interval: 60,
      max: 100,
    }),
  ],
});

const handleDecision = (decision: ArcjetDecision) => {
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit())
      throw new ApiError(429, "Too many requests");

    if (decision.reason.isEmail()) {
      const type = decision.reason.emailTypes[0]!;
      const messageMaps: Record<string, string> = {
        DISPOSABLE: "Disposable email addresses are not allowed.",
        INVALID: "Email address is invalid.",
        NO_MX_RECORDS: "Email domain is not valid.",
        NO_GRAVATAR: "Email address is not associated with a Gravatar.",
      };
      throw new ApiError(400, messageMaps[type] || "Email address is invalid.");
    }

    if (decision.reason.isBot() || decision.results.some(isSpoofedBot)) {
      throw new ApiError(400, "Bots are not allowed.");
    }

    if (decision.ip.isHosting())
      throw new ApiError(400, "Hosting IPs are not allowed.");

    throw new ApiError(403, "Access denied");
  }
};

export const arcjectProtection = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const ip = findIp(req);

  const decision = await aj.protect(req, { requested: 1, ip });

  handleDecision(decision);

  next();
};

export const arcjetSignUpProtection = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const ip = findIp(req);

  const decision = await signUpProtection.protect(req, {
    email,
    ip,
  });

  handleDecision(decision);

  next();
};
