const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.token = decodedToken;
  next();
};
