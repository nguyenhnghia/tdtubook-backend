require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");

const db = require("./config/db");
const logger = require("./config/logger");
const route = require("./routes");
const socketIO = require("./socket.io");

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

// Use http to create server for socket
const server = http.createServer(app);

// Init socket IO
socketIO.init(server);

server.listen(PORT, () => {
  logger.info(`Server is running at: http://localhost:${PORT}`);
});
