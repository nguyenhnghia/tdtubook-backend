const authRouter = require("./controllers/auth/auth.routes");
const commentRouter = require("./controllers/comment/comment.routes");
const postRouter = require("./controllers/post/post.routes");
const userRouter = require("./controllers/user/user.routes");

const catchError = require("./middlewares/error.middleware");

const route = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/posts/:postId/comments", commentRouter);
  app.use("/api/posts", postRouter);
  app.use("/api/users", userRouter);
  app.use(catchError);

  // 404 Not found
  app.use((req, res) => {
    res.status(404).json({
      status: "error",
      message: "Resources not found",
    });
  });
};

module.exports = route;
