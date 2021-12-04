const jwt = require("jsonwebtoken");

const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    const token = bearer.split(" ")[1];
    if (!token) {
      res.status(401).json({ status: "error", message: "No token found" });
      return;
    }

    // Decode Bearer token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.decoded = decoded;

    // Verify User with _id and token
    const user = await User.findOne({ _id: decoded._id, token });
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
};

module.exports = auth;
