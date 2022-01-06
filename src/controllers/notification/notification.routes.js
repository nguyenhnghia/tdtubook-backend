const express = require("express");

const notificationService = require("./notification.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const notificationRouter = express.Router();
const notificationFields = ["title", "content", "department", "category"];

// Top level middlewares
notificationRouter.use(authMiddleware, permit("admin", "department"));

// [GET] /api/notifications/:notificationId
notificationRouter.get(
  "/:notificationId",
  asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await notificationService.getNotificationById(notificationId);

    res.status(200).json({ status: "success", notification });
  })
);

// [GET] /api/notifications
notificationRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, notificationFields);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { docs: notifications, ...pageInfo } = await notificationService.queryNotifications(
      query,
      options
    );

    res.status(200).json({ status: "success", notifications, ...pageInfo });
  })
);

// [POST] /api/notifications
notificationRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const createBody = pick(req.body, notificationFields);

    const notification = await notificationService.createNotification(createBody, req.user);

    res.status(200).json({ status: "success", notification });
  })
);

// [PUT] /api/notifications/:notificationId
notificationRouter.put(
  "/:notificationId",
  asyncHandler(async (req, res) => {
    const { notificationId } = req.params;
    const updateBody = pick(req.body, notificationFields);

    const notification = await notificationService.updateNotification(notificationId, updateBody);

    res.status(200).json({ status: "success", notification });
  })
);

// [DELETE] /api/notifications/:notificationId
notificationRouter.delete(
  "/:notificationId",
  asyncHandler(async (req, res) => {
    const { notificationId } = req.params;

    const notification = await notificationService.deleteNotification(notificationId);

    res.status(200).json({ status: "success", notification });
  })
);

module.exports = notificationRouter;
