import { Strategy } from "passport-local";
import { User } from "@/models/user.model.js";
import type { PassportStatic } from "passport";

export const LocalStrategy = (passport: PassportStatic) => {
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select("+password");

        if (!user)
          return done(null, false, { message: "Invalid email or password." });

        if (!user.isEmailVerified)
          return done(null, false, { message: "Email not verified." });

        const isPasswordValid = await user.isPasswordValid(password);

        if (!isPasswordValid)
          return done(null, false, { message: "Invalid email or password." });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
};
