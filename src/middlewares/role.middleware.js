/* eslint-disable arrow-body-style */

const ApiError = require("../utils/ApiError");

const permit = (...permittedRoles) => {
  // Return a middleware
  return (req, res, next) => {
    const { user } = req;

    const isOwnerPermitted = permittedRoles.includes("owner");

    if (isOwnerPermitted) {
      // If userId is match, then ownership is met
      if (user._id.toString() === req.params.userId) {
        return next();
      }
    }

    const isAllPermitted = permittedRoles.includes("all");
    const isUserPermitted = permittedRoles.includes(user.role);

    if (user && (isAllPermitted || isUserPermitted)) {
      return next(); // User role is allowed, so continue on the next middleware
    }

    throw new ApiError(403, "Forbidden");
  };
};

module.exports = permit;
