const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

app.use(cors());
/* 
app.get("/", (req, res, next) => {
  res.sendFile(join(__dirname, "index.html")); 
  console.log("connect");
  next();
});
 */
io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log("message from =>" + socket.id + " :" + msg);
    io.emit("send_msg_to_all_users", msg);
  });
  socket.on("show_typing_status", () => {
    socket.broadcast.emit("show_typing_status");
  });

  socket.on("stop_typing", () => {
    socket.broadcast.emit("stop_typing");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
