import React from "react";
import "./WelcomePage.css";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";
// X O WelcomePage
function WelcomePage() {
    const navigate = useNavigate();

    const newGame = () => {
        socket.emit("new game");
    }

    socket.on("room created", (room) => {
        socket.player = "X";
        navigate("/WaitingForOthers", { state: { room: room } });
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