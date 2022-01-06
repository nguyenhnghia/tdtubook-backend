const { Server } = require("socket.io");

const init = (server) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    // User create a new post
    socket.on("post:new", (msg) => {
      socket.broadcast.emit("post:new", msg);
    });
  });
};

module.exports = { init };
