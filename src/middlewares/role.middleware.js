/* eslint-disable arrow-body-style */
/* prettier-ignore */

const permit = (...permittedRoles) => {
  const ROLE = ["admin", "faculty", "student", "user"];
  // const ADMIN_EMAIL = [
  //   "51900790@student.tdtu.edu.vn",
  // ]

  // Return a middleware
  return (req, res, next) => {
    const { user } = req;
    const userRole = ROLE[user.role];
    
    if (user && permittedRoles.includes(userRole)) {
      next(); // User role is allowed, so continue on the next middleware
    } else {
      res.status(403).json({ status: "error", message: "Forbidden" });
    }
  };
}

module.exports = permit;
