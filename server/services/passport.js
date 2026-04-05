/** @format */

import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import mongoose from "mongoose";
import keys from "../config/keys.js";

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user || false);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
          }).save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    },
  ),
);
