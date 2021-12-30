/* eslint-disable no-unused-vars */

const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");

const catchError = (err, req, res, next) => {
  logger.error(err);

  // Default is Internal Server Error
  let statusCode = 500;

  // Check if error is customized
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
};

module.exports = catchError;
