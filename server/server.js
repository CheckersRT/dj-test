import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

// socket.on("join_room", )

  socket.on("send_message", (data) => {
    console.log(data);
    socket.broadcast.emit("receive_message", data);
  });

  socket.on("send_controlInput", (data) => {
    console.log(data)
    socket.broadcast.emit("receive_controlInput", data)
  })


});

server.listen(3001, () => {
  console.log("Server is running on 3001");
});
