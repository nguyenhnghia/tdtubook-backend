const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    const token = bearer.split(" ")[1];
    if (!token) {
      res.status(401).json({ status: "error", message: "No token found" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(401).json({ status: "error", message: "Unauthorized" });
  }
};

module.exports = auth;
