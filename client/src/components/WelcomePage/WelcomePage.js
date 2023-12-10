import React from "react";
import "./WelcomePage.css";
import {io} from "socket.io-client";
import { useNavigate } from "react-router";
// X O WelcomePage
function WelcomePage() {
    const navigate = useNavigate();
    const socket = io("http://localhost:3000");

    const newGame = () => {
        socket.emit("new game");
    }

    socket.on("room created", (room) => {
        navigate("/WaitingForOthers", {state: {room: room}});
    });

    const joinGame = () => {
        navigate("/JoinGame");
    }

  return (
    <div className="WelcomePage">
        <button onClick={newGame}>New Game</button>
        <button onClick={joinGame}>Join Game</button>
    </div>
  );
}

export default WelcomePage;