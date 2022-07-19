const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
	name: {
		// required: true,
		type: String,
	},
	// firstName: {
	// 	type: String,
	// },

	// lastName: {
	// 	type: String,
	// },
	email: {
		// required: true,
		type: String,
	},
	picture: {
		type: String,
	},
	facebook_id: {
		type: String,
	},
	// password: {
	// 	required: true,
	// 	type: String,
	// },
	// refreshToken: {
	// 	type: String,
	// 	default: "",
	// },
});

userSchema.options.toJSON = {
	transform: function (doc, ret, options) {
		delete ret._id;
		delete ret.password;
		delete ret.__v;
		delete ret.refreshToken;
		return ret;
	},
};
userSchema.statics.createUser = async function (request) {
	let data = {};
	await bcrypt.hash(request.password, 10).then(async (hash) => {
		data = await this.create({
			name: request.name,
			email: request.email,
			password: hash,
		});
	});
	return data;
};
userSchema.statics.createAccessToken = function (data) {
	return jwt.sign({ data: data }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	});
};
module.exports = mongoose.model("User", userSchema);
