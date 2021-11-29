require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const route = require("./routes/index.routes");
const db = require("./config/db");
const logger = require("./config/logger");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny", { stream: logger.stream }));

// DB connect
db.connect();

// Routing
route(app);

app.listen(PORT, () => {
  logger.info(`Server is running at: http://localhost:${PORT}`);
});

module.exports = app;
