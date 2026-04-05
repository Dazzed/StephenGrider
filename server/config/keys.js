/** @format */

export default {
  cookieKey: process.env.SESSION_SECRET || "dev-session-secret-change-me",
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  mongoURI: process.env.MONGO_URI,
};
