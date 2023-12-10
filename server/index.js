const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "home.html"));
});

let rooms = [];

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("new game", () => {
        let room = Math.floor(Math.random() * 1000000);
        rooms.push(room);
        socket.join(room);
        socket.emit("room created", room);
    });
    socket.on("join game", (room) => {
        room = parseInt(room);
        if (rooms.includes(room)) {
            socket.join(room);
            console.log(room);
            socket.to(room).emit("room joined", room);
            rooms = rooms.filter(r => r !== room);
        } else {
            socket.emit("room not found");
            console.log("Room not found");
        }
    });
    socket.on("move", (data) => {
        socket.to(data.room).emit("move", data);
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});