const { Server } = require("socket.io");

const init = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    // User create a new post
    socket.on("post:create", (post) => {
      socket.broadcast.emit("post:create", post);
    });
  });
};

module.exports = { init };
