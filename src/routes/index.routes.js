const authRouter = require("./auth.router");

const route = (app) => {
  app.use("/api/auth", authRouter);

  app.use((err, req, res, next) => {
    res.status(500).json({ message: "Sever error" });
  });
};

module.exports = route;
