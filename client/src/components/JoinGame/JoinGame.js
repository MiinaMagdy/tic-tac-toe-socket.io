import React, { useEffect, useState } from "react";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";
import "./JoinGame.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function JoinGame() {
    const navigate = useNavigate();
    const [room, setRoom] = useState("");
    const Notify = (message, type) => {
        toast(message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          type: type,
        });
    };

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
        socket.on("room not found", () => {
            console.log("Room not found");
            Notify("Room not found", "error");
        });

        // Clean up on component unmount
        // return () => {
        //     socket.off("room joined", handleRoomJoined);
        //     socket.off("start game", handleStartGame);
        // };
    }, [navigate]);

    const joinGame = () => {
        
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
