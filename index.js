const express = require("express");
const app = express();

const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server);

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
        if (rooms.includes(room)) {
            socket.join(room);
            socket.emit("room joined", room);
        } else {
            socket.emit("room not found");
        }
    });
    socket.on("move", (data) => {
        socket.to(data.room).emit("move", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});