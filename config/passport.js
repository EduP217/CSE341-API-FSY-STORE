require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const User = require("../models/user");
const Client = require("../models/clients");

const findOrCreateUser = async (id, provider, name, image, accessToken, clientEmail, clientPhoneNumber) =>
  await User.findOne({ OAuthProfileId: id })
    .then(async (user) => {
      if (!user){
        user = await User.create({
          OAuthProfileId: id,
          provider: provider,
          name: name,
          photoImage: image,
          accessToken,
          roleID: "6348f78c09ff1d1b1e0db027",
        });
        
        await Client.create({
          userId: user.id,
          email: clientEmail,
          phoneNumber: clientPhoneNumber
        })
      }
      return user;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        await findOrCreateUser(
          profile.id,
          profile.provider,
          profile.displayName,
          profile.photos[0].value,
          accessToken
        )
          .then((user) => done(null, user))
          .catch((err) => console.error(err));
      }
    )
  );

  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/api/v1/auth/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        await findOrCreateUser(
          profile.id,
          profile.provider,
          profile.displayName || profile.username,
          profile._json.avatar_url || profile.photos[0].value,
          accessToken
        )
          .then((user) => done(null, user))
          .catch((err) => console.error(err));
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
