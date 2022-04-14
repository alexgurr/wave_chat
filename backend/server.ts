import express from "express";
import cors from "cors";
import http from "http";
import { Server as IOServer } from "socket.io";
import CONFIG from "./config";

import createMessage from "./utils/createMessage";

const app = express();
const router = express.Router();

const httpServer = http.createServer(http);
const io = new IOServer(httpServer);

app.use(router);
app.use(cors({ origin: "*" }));

// Querying the chat name from the socket object
io.on("connection", (socket) => {
  socket.emit("newMessage", createMessage("Admin", "Welcome to Wave Chat App"));

  socket.broadcast.emit(
    "newMessage",
    createMessage("Admin", `${socket.handshake.query.name} has joined the room`)
  );

  socket.on("createMessage", (message) => {
    io.emit(
      "newMessage",
      createMessage(socket.handshake.query.name, message.text)
    );
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "newMessage",
      createMessage("Admin", `${socket.handshake.query.name} has left the room`)
    );
  });
});

httpServer.listen(CONFIG.PORT, () => {
  console.log(`Server listening on *:${CONFIG.PORT} 🚀`);
});
