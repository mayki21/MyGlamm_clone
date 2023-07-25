const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");


const client_id="852962267519-1o973l9mdk2mpkee3bgac01hjbci2ofs.apps.googleusercontent.com"
const client_secret="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"




passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:8080/user/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      let user = {
        name: profile._json.name,
        email: profile._json.email,
        password: uuidv4(),
        avatar: profile._json.picture,
      };
      
      return cb(null, user);
    }
  )
);

module.exports = passport ;