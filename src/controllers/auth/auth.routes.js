const express = require("express");

const authService = require("./auth.service");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const authRouter = express.Router();

// [POST] /api/auth/login
authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const loginData = pick(req.body, ["username", "password"]);

    const token = await authService.loginWithUsernamePassword(loginData);
    if (!token) {
      res.status(401).json({ status: "error", message: "Login failed" });
      return;
    }

    res.status(200).json({ status: "success", token });
  })
);

module.exports = authRouter;
