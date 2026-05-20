import { Strategy } from "passport-local";
import { User } from "@/models/user.model.js";
import type { PassportStatic } from "passport";

export const LocalStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select("+password");

        if (!user) return done(new Error("Invalid email or password."), false);

        if (!user.isEmailVerified)
          return done(new Error("Email is not verified."), false);

        const isPasswordValid = await user.isPasswordValid(password);

        if (!isPasswordValid)
          return done(new Error("Invalid email or password."), false);

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
