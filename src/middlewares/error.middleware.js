/* eslint-disable no-unused-vars */

const logger = require("../config/logger");

const catchError = (err, req, res, next) => {
  logger.error(err);

  res.status(500).json({ status: "error", message: "Internal Server Error" });
};

module.exports = catchError;
