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

function createGameData(room) {
    return {
        board: Array(3).fill(null).map(() => Array(3).fill(null)),
        currentPlayer: 'X',
        winner: null,
        room: room
    };
}
let rooms = [];

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("new game", () => {
        let room = Math.floor(Math.random() * 1000000);
        rooms[room] = createGameData(room);
        console.log(rooms, room in rooms);
        socket.join(room);
        socket.emit("room created", room);
    });
    socket.on("join game", (room) => {
        room = parseInt(room);
        console.log(room);
        if (room in rooms) {
            socket.join(room);
            console.log(room);
            socket.emit("room joined");
            console.log(rooms[room]);
            io.to(room).emit("start game", rooms[room]);
            rooms = rooms.filter(r => r !== room);
        } else {
            socket.emit("room not found");
            console.log("Room not found");
        }
    });
    socket.on("move", (data) => {
        data.winner = checkWin(data.board);
        if (data.winner !== null) {
            console.log("Winner: ", data.winner);
            data.currentPlayer = null;
            io.to(data.room).emit("game over", data);
            return;
        }
        data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
        io.to(data.room).emit("move", data);
    });
    socket.on("rematch", (room) => {
        io.to(room).emit("rematch", createGameData(room));
    });
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

function checkWin(board) {
    let winner = null;
    // Check rows
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== null && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
            winner = board[i][0];
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (board[0][i] !== null && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
            winner = board[0][i];
        }
    }
    // Check diagonals
    if (board[0][0] !== null && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        winner = board[0][0];
    }
    if (board[0][2] !== null && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        winner = board[0][2];
    }

    if (winner === null && checkDraw(board)) {
        winner = "draw";
    }
    return winner;
}

function checkDraw(board) {
    let draw = true;
    board.forEach(row => {
        row.forEach(square => {
            if (square === null) {
                draw = false;
            }
        });
    });
    return draw;
}

app.use(express.static(path.join(__dirname, 'client/build')));

// Handle other routes by serving the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

server.listen(3000, () => {
    console.log("Listening on port 3000");
});