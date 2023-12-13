import React, { useState, useEffect } from "react";
import "./Game.css";
import { socket } from "../../Socket";
import { useLocation } from "react-router-dom";
import "./Game.css";

function X() {
    return (
        <div className="x">
            <div className="line line1"></div>
            <div className="line line2"></div>
        </div>
    );
}

function O() {
    return (
        <div className="o"></div>
    );
}

function Game() {
    const locationState = useLocation().state;
    const [gameData, setGameData] = useState(locationState);

    useEffect(() => {
        socket.on("move", (newData) => {
            setGameData(newData);
        });

        socket.on("game over", (newData) => {
            setGameData(newData);
        });

        // Clean up on component unmount
        // return () => {
        //     socket.off("move");
        // };
    }, []);

    function handleClick(row, col) {
        if (gameData.currentPlayer !== socket.player) return;
        if (gameData.board[row][col] === null) {
            const newGameData = { ...gameData };
            newGameData.board = [...gameData.board];
            newGameData.board[row][col] = socket.player;
            setGameData(newGameData);
            socket.emit("move", newGameData);
        }
    }

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <p className="player">You are player: {socket.player}</p>
            <p className="turn">Turn: {gameData.currentPlayer === socket.player ? "Your Turn" : "Opponent's Turn"}</p>
            <div className="board">
                {gameData.board.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((square, colIndex) => (
                            <div
                                className="square"
                                key={colIndex}
                                onClick={() => handleClick(rowIndex, colIndex)}
                            >
                                {square === "X" ? <X /> : square === "O" ? <O /> : null}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Game;
