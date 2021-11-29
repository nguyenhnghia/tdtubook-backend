const { authService } = require("../services");
const pick = require("../utils/pick");

// [POST] /api/auth/login
const loginWithUsernamePassword = async (req, res) => {
  const loginData = pick(req.body, ["username", "password"]);

  const accessToken = await authService.loginWithUsernamePassword(loginData);
  if (!accessToken) {
    res.status(401).json({ status: "error", message: "Login failed" });
    return;
  }

  res.status(200).json({ status: "success", accessToken });
};

// [POST] /api/auth/register
const register = async (req, res) => {
  const registerData = pick(req.body, ["name", "username", "password", "role"]);

  const result = await authService.register(registerData);
  if (!result) {
    res.status(401).json({ status: "error", message: "Create user failed" });
    return;
  }

  res.status(200).json({ status: "success", ...result });
};

module.exports = {
  loginWithUsernamePassword,
  register,
};
