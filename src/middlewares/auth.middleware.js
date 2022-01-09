const jwt = require("jsonwebtoken");

const User = require("../models/User");

const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");

const auth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) throw new ApiError(401, "No authorization header");

    const token = bearer.split(" ")[1];
    if (!token) throw new ApiError(401, "No token found");

    // Decode Bearer token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.decoded = decoded;

    // Verify User with _id and token
    const user = await User.findOne({ _id: decoded._id, token }).populate([
      {
        path: "categories",
        select: "name tag",
      },
    ]);
    if (!user) throw new ApiError(401, "Login failed");
    req.user = user;

    next();
  } catch (error) {
    logger.error(error);

    // Default is Unauthorized
    let statusCode = 401;
    let message = "Unauthorized";

    // Check if error is customized
    if (error instanceof ApiError) {
      statusCode = error.statusCode;
      message = error.message;
    }

    res.status(statusCode).json({ status: "error", message });
  }
};

module.exports = auth;
