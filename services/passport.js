const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

//after user successfully logs into the webite the user.id of mongodb will be passed to serve as the token among different webpages
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//to end the token session of a user
passport.deserializeUser((id, done) =>
  User.findById(id).then((user) => done(null, user))
);

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((existingUser) => {
        if (!existingUser) {
          new User({ googleID: profile.id })
            .save()
            .then((newUser) => done(null, newUser));
        } else {
          //user already exists
          done(null, existingUser); //informs passport that authentication was successful and new user was created
        }
      });
    }
  )
);
