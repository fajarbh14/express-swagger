const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const httpCodes = require("../utils/httpCodes");
module.exports = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	console.log(`Auth: ${authHeader}`);
	const token = authHeader && authHeader.split(" ")[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err)
			return response(res, httpCodes.FORBIDDEN, "Access denied", null);
		req.user = decoded;
		next();
	});
};
