import { Strategy, type StrategyOptions } from "passport-jwt";
import { User } from "@/models/user.model.js";
import type { PassportStatic } from "passport";
import type { JwtPayload } from "jsonwebtoken";
import type { Request } from "express";

const options: StrategyOptions = {
  jwtFromRequest: function (req: Request) {
    const token =
      req.cookies?.accessToken ||
      req.headers.authorization?.replace("Bearer ", "");

    return token || null;
  },
  secretOrKey: process.env.ACCESS_TOKEN_SECRET!,
};

export const JwtStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy(options, async function (jwt_payload: JwtPayload, done) {
      try {
        const user = await User.findById(jwt_payload._id).populate("profile");

        if (!user)
          return done(null, false, { message: "Invalid email or password." });

        if (!user.isEmailVerified)
          return done(null, false, { message: "Email not verified." });

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    })
  );
};
