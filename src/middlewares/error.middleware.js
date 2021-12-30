/* eslint-disable no-unused-vars */

const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");

const catchError = (err, req, res, next) => {
  logger.error(err);

  // Default is Internal Server Error
  let statusCode = 500;
  let message = "Internal Server Error";

  // Check if error is customized
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({ status: "error", message });
};

module.exports = catchError;
