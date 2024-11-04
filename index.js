const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://example.com",
  },
});

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

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
