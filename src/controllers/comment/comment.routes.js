const express = require("express");

const commentService = require("./comment.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const commentRouter = express.Router({ mergeParams: true });

// Top level middlewares
commentRouter.use(authMiddleware, permit("all"));

// [GET] /api/posts/:postId/comments/:commentId
commentRouter.get(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    const comment = await commentService.getCommentById(commentId);

    res.status(200).json({ status: "success", comment });
  })
);

// [GET] /api/posts/:postId/comments
commentRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, ["content"]);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { docs: comments, ...pageInfo } = await commentService.queryComments(query, options);

    res.status(200).json({ status: "success", comments, ...pageInfo });
  })
);

// [POST] /api/posts/:postId/comments
commentRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const createBody = pick(req.body, ["content"]);

    const comment = await commentService.createComment(createBody, postId, req.user);

    res.status(200).json({ status: "success", comment });
  })
);

// [PUT] /api/posts/:postId/comments/:commentId
commentRouter.put(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const updateBody = pick(req.body, ["content"]);

    const comment = await commentService.updateComment(commentId, updateBody);

    res.status(200).json({ status: "success", comment });
  })
);

// [DELETE] /api/posts/:postId/comments/:commentId
commentRouter.delete(
  "/:commentId",
  asyncHandler(async (req, res) => {
    const { commentId, postId } = req.params;

    const comment = await commentService.deleteComment(commentId, postId);

    res.status(200).json({ status: "success", comment });
  })
);

module.exports = commentRouter;
