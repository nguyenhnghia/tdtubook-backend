/* eslint-disable arrow-body-style */

const permit = (...permittedRoles) => {
  // Return a middleware
  return (req, res, next) => {
    const { user } = req;

    if (user && permittedRoles.includes(user.role)) {
      next(); // User role is allowed, so continue on the next middleware
    } else {
      res.status(403).json({ status: "error", message: "Forbidden" });
    }
  };
};

module.exports = permit;
