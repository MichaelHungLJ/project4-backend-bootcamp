const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header: ", authHeader);

    const authToken = authHeader && authHeader.split(" ")[1];

    if (authToken === null) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // If there is a token, verify the token
    const verifiedToken = jwt.verify(authToken, process.env.JWT_SECRET);

    console.log("Verified Token: ", verifiedToken);

    next();
    retur;
  } catch (err) {
    return res.json({ success: false, error: err });
  }
};

module.exports = auth;
