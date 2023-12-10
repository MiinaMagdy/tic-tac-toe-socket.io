import React from "react";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";
function JoinGame() {
    const navigate = useNavigate();
    const [room, setRoom] = React.useState("");
    const joinGame = () => {
        console.log(room);
        socket.emit("join game", room);
    }
    socket.on("room joined", (room) => {
        console.log("room joined");
        socket.inTurn = false;
        socket.player = "O";
        navigate("/Game", { state: { room: room } });
    });

    return (
        <div className="join-game">
            <h1>Join Game</h1>
            <input
                type="text"
                placeholder="Room Code"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinGame}>Join Game</button>
        </div>
    );
}

export default JoinGame;