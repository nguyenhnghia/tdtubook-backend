const authRouter = require("./auth.router");
const catchError = require("../middleware/error.middleware");

const route = (app) => {
  app.use("/api/auth", authRouter);

  app.use(catchError);
};

module.exports = route;
