import React, { useEffect, useState } from "react";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";

function JoinGame() {
    const navigate = useNavigate();
    const [room, setRoom] = useState("");

    useEffect(() => {
        const handleRoomJoined = () => {
            socket.player = "O";
        };

        const handleStartGame = (gameData) => {
            navigate("/Game", { state: gameData });
        };

        // Set up socket event listeners
        socket.on("room joined", handleRoomJoined);
        socket.on("start game", handleStartGame);

        // Clean up on component unmount
        // return () => {
        //     socket.off("room joined", handleRoomJoined);
        //     socket.off("start game", handleStartGame);
        // };
    }, [navigate]);

    const joinGame = () => {
        console.log(room);
        socket.emit("join game", room);
    }

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
