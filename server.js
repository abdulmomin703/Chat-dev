const { use } = require("./app");
const logger = require("./config/logger");
let onlineUsers = [];

const getSocketId = (user) => {
  logger.info("I am here");
  let userFound = onlineUsers.find((value) => value.username == user);
  return userFound.id;
};
module.exports = function (servers) {
  const io = require("socket.io")(servers);

  io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("addUser", ({ username }) => {
      let temp = onlineUsers.filter((user) => user.username != username);
      temp.push({ id: socket.id, username: username });
      onlineUsers = temp;
      logger.info("Online Users", onlineUsers);
      logger.info("A user connected");
    });

    socket.on("removeUser", ({ username }) => {
      let temp = onlineUsers.filter((user) => user.username != username);
      onlineUsers = temp;
      console.log("Online Users", onlineUsers);
      logger.info("A user disconnected");
    });

    socket.on("send-message", ({ sender, reciever, val }) => {
      logger.info({ sender, reciever, val });
      const socketId = getSocketId(reciever);
      logger.info("OOKOK", socketId);
      io.to(socketId).emit("get-message", { sender, reciever, val });
    });
  });
};
