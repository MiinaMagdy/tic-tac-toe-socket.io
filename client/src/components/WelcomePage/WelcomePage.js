import React, { useEffect } from "react";
import "./WelcomePage.css";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";

function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRoomCreated = (room) => {
            socket.player = "X";
            navigate("/WaitingForOthers", { state: { room } });
        };

        // Set up socket event listener
        socket.on("room created", handleRoomCreated);

        // Clean up on component unmount
        // return () => {
        //     socket.off("room created", handleRoomCreated);
        // };
    }, [navigate]);

    const newGame = () => {
        socket.emit("new game");
    }

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
