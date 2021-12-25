const express = require("express");

const userService = require("./user.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const userRouter = express.Router();

// Top level middlewares
userRouter.use(authMiddleware, permit("admin"));

// [GET] /api/users/:userId
userRouter.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await userService.getUserById(userId);

    res.status(200).json({ status: "success", user });
  })
);

// [GET] /api/users
userRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, ["name", "username", "email"]);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { docs: users, ...pageInfo } = await userService.queryUsers(query, options);

    res.status(200).json({ status: "success", users, ...pageInfo });
  })
);

// [POST] /api/users
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const createBody = pick(req.body, ["name", "username", "password", "email", "role"]);

    const { user, token } = await userService.createUser(createBody);

    res.status(200).json({ status: "success", user, token });
  })
);

// [PUT] /api/users/:userId
userRouter.put(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updateBody = pick(req.body, ["name", "username", "email", "role"]);

    const user = await userService.updateUser(userId, updateBody);

    res.status(200).json({ status: "success", user });
  })
);

// [DELETE] /api/users/:userId
userRouter.delete(
  "/:userId",
  asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await userService.deleteUser(userId);

    res.status(200).json({ status: "success", user });
  })
);

module.exports = userRouter;
