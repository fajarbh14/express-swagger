const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("../routes");
const db = require("../config/database/instance");
const app = express();
const passport = require("passport");
const expressSession = require("express-session");
const bodyParser = require("body-parser");

app.use(expressSession({ secret: "secret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

db();

app.use(routes);

module.exports = app;
