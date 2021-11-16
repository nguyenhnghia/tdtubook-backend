const authRouter = require("./authRoute");

function Route(app) {
  app.use("/auth", authRouter);
}
module.exports = Route;
