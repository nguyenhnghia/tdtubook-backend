const express = require("express");

const authService = require("./auth.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const authRouter = express.Router();

// [POST] /api/auth/login
authRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const loginData = pick(req.body, ["username", "password"]);

    const authToken = await authService.loginWithUsernamePassword(loginData);
    if (!authToken) {
      res.status(401).json({ status: "error", message: "Login failed" });
      return;
    }

    res.status(200).json({ status: "success", authToken });
  })
);

// [POST] /api/auth/google-login
authRouter.post(
  "/google-login",
  asyncHandler(async (req, res) => {
    const { tokenId } = req.body;

    const authToken = await authService.loginWithGoogle(tokenId);

    res.status(200).json({ status: "success", authToken });
  })
);

// [GET] /api/auth/load
authRouter.get(
  "/load",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const user = pick(req.user.toObject(), ["_id", "name", "avatar", "categories", "role"]);

    res.status(200).json({ status: "success", user });
  })
);

// [POST] /api/auth/change-password
authRouter.post(
  "/change-password",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    await authService.changePassword(userId, oldPassword, newPassword);

    res.status(200).json({ status: "success", user: null });
  })
);

module.exports = authRouter;
