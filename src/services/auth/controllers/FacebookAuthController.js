const passport = require("passport");
const strategy = require("passport-facebook");
const userModel = require("../models/User");
require("dotenv").config();
const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});
passport.use(
	new FacebookStrategy(
		{
			clientID: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
			callbackURL: process.env.FACEBOOK_CALLBACK_URL,
			profileFields: ["id", "displayName", "email", "photos"],
		},
		async function (accessToken, refreshToken, profile, done) {
			const { email, name, picture, id } = profile._json;
			const userData = {
				email,
				name,
				picture: picture.data.url,
				facebook_id: id,
			};
			console.log(profile._json, "profile");
			console.log(accessToken, "accessToken");
			console.log(refreshToken, "refreshToken");
			await userModel.create(userData);
			return done(refreshToken, accessToken, profile);
		}
	)
);
