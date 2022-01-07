const express = require("express");

const likeService = require("./like.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const likeRouter = express.Router({ mergeParams: true });

// Top level middlewares
likeRouter.use(authMiddleware, permit("all"));

// [GET] /api/posts/:postId/likes/:likeId
likeRouter.get(
  "/:likeId",
  asyncHandler(async (req, res) => {
    const { likeId } = req.params;

    const like = await likeService.getLikeById(likeId);

    res.status(200).json({ status: "success", like });
  })
);

// [GET] /api/posts/:postId/likes
likeRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, ["user"]);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { docs: likes, ...pageInfo } = await likeService.queryLikes(query, options);

    res.status(200).json({ status: "success", likes, ...pageInfo });
  })
);

// [POST] /api/posts/:postId/likes
likeRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const like = await likeService.createLike(postId, req.user);

    res.status(200).json({ status: "success", like });
  })
);

// [DELETE] /api/posts/:postId/likes/:likeId
likeRouter.delete(
  "/:likeId",
  asyncHandler(async (req, res) => {
    const { likeId, postId } = req.params;

    const like = await likeService.deleteLike(likeId, postId);

    res.status(200).json({ status: "success", like });
  })
);

module.exports = likeRouter;
