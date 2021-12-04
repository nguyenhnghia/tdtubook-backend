const authRouter = require("./controllers/auth/auth.routes");
const userRouter = require("./controllers/user/user.routes");

const catchError = require("./middlewares/error.middleware");

const route = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/users", userRouter);
  app.use(catchError);
};

module.exports = route;
