/** @format */

import express from "express";
import session from "express-session";
import passport from "passport";
import "./models/User.js";
import "./services/passport.js";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import keys from "./config/keys.js";

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
const app = express();
app.use(
  session({
    secret: keys.cookieKey,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
authRoutes(app);
const PORT = process.env.PORT || 3001;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});
