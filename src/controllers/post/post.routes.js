const express = require("express");

const postService = require("./post.service");
const authMiddleware = require("../../middlewares/auth.middleware");
const permit = require("../../middlewares/role.middleware");
const asyncHandler = require("../../utils/asyncHandler");
const pick = require("../../utils/pick");

const postRouter = express.Router();

// Top level middlewares
postRouter.use(authMiddleware, permit("all"));

// [GET] /api/posts/:postId
postRouter.get(
  "/:postId",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await postService.getPostById(postId);

    res.status(200).json({ status: "success", post });
  })
);

// [GET] /api/posts
postRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const query = pick(req.query, ["content"]);
    const options = pick(req.query, ["sort", "limit", "page"]);

    const { docs: posts, ...pageInfo } = await postService.queryPosts(query, options);

    res.status(200).json({ status: "success", posts, ...pageInfo });
  })
);

// [POST] /api/posts
postRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = pick(req.body, ["content"]);
    const createBody = { ...data, user: req.user._id };

    const post = await postService.createPost(createBody, req.user);

    res.status(200).json({ status: "success", post });
  })
);

// [PUT] /api/posts/:postId
postRouter.put(
  "/:postId",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const updateBody = pick(req.body, ["content"]);

    const post = await postService.updatePost(postId, updateBody);

    res.status(200).json({ status: "success", post });
  })
);

// [DELETE] /api/posts/:postId
postRouter.delete(
  "/:postId",
  asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await postService.deletePost(postId);

    res.status(200).json({ status: "success", post });
  })
);

module.exports = postRouter;
