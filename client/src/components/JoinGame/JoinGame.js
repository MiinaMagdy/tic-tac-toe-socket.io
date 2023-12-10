import React from "react";
import {io} from "socket.io-client";
import { useNavigate } from "react-router";
function JoinGame() {
    const socket = io("http://localhost:3000");
    const navigate = useNavigate();
    const [room, setRoom] = React.useState("");
    const joinGame = () => {
        console.log(room);
        socket.emit("join game", room);
    }
    socket.on("room joined", (room) => {
        console.log("room joined");
        navigate("/Game", {state: {room: room}});
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