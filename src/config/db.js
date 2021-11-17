const mongoose = require("mongoose");

const logger = require("./logger");

// Log error and exit app if mongodb connection fail
const exitProcessWhenError = (error) => {
  logger.error(`Connection error: ${error}`, { label: "mongoose" });

  // Stop process without app crash
  process.exitCode = 1;
};

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    exitProcessWhenError(err);
  }
};

mongoose.connection
  .once("open", () => logger.info("MongoDB connected"))
  .on("error", (err) => exitProcessWhenError(err));

module.exports = { connect };
