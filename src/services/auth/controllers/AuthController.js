const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const response = require("../../../utils/response");
const httpCodes = require("../../../utils/httpCodes");
const bcrypt = require("bcrypt");
const logger = require("../../../utils/logger");
module.exports = {
	register: async (req, res) => {
		try {
			response(
				res,
				httpCodes.OK,
				"Register Successfully",
				await userModel.createUser(req.body)
			);
		} catch (err) {
			logger.error(err.message);
			return response(
				res,
				httpCodes.INTERNAL_SERVER_ERROR,
				error.message,
				null
			);
		}
	},
	login: async (req, res) => {
		try {
			const user = await userModel.findOne({ email: req.body.email });
			if (!user)
				return response(
					res,
					httpCodes.BAD_REQUEST,
					"Email / Password is Wrong",
					null
				);
			const isValid = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (!isValid)
				return response(
					res,
					httpCodes.BAD_REQUEST,
					"Email / Password is Wrong",
					null
				);

			const refreshToken = jwt.sign(
				{ email: user.email, name: user.name, id: user.id },
				process.env.REFRESH_TOKEN_SECRET,
				{ expiresIn: "1d" }
			);
			const accessToken = await userModel.createAccessToken({
				email: user.email,
				name: user.name,
				id: user._id,
			});

			await user.updateOne({ refreshToken });
			res.cookie("refreshToken", refreshToken, {
				// httpOnly: true,
				maxAge: 24 * 60 * 60 * 1000,
			});

			return response(res, httpCodes.OK, "Login Successfully", {
				user,
				accessToken,
			});
		} catch (err) {
			logger.error(err.message);
			return response(
				res,
				httpCodes.INTERNAL_SERVER_ERROR,
				err.message,
				null
			);
		}
	},
	updateAccessToken: async (req, res) => {
		const refreshToken = req.cookies.refreshToken;
		const user =
			refreshToken && (await userModel.findOne({ refreshToken }));
		if (!user)
			return response(
				res,
				httpCodes.FORBIDDEN,
				"Refresh token not found",
				null
			);
		let accessToken = "";
		await jwt.verify(
			refreshToken,
			process.env.REFRESH_TOKEN_SECRET,
			async (err, decoded) => {
				if (err) return res.sendStatus(403);
				// generate token until 30 seconds
				console.log("/token", decoded);
				accessToken = await userModel.createAccessToken(decoded);
			}
		);
		return response(
			res,
			httpCodes.OK,
			"Access Token Successfully Generated",
			{
				user,
				token: accessToken,
			}
		);
	},
	logout: async function (req, res) {
		try {
			const refreshToken = req.cookies.refreshToken;
			const user =
				refreshToken && (await userModel.findOne({ refreshToken }));
			if (!user)
				return response(
					res,
					httpCodes.BAD_REQUEST,
					"User not found",
					null
				);
			await user.updateOne({ refreshToken: "" });
			res.clearCookie("refreshToken");
			response(res, httpCodes.OK, "User Succesfully Logout", null);
		} catch (error) {
			logger.error(error.message);
			response(
				res,
				httpCodes.INTERNAL_SERVER_ERROR,
				error.message,
				null
			);
		}
	},
};
