const logger = require("../config/logger");

// eslint-disable-next-line no-unused-vars
const catchError = (err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ success: false, message: err.message });
};
module.exports = catchError;
