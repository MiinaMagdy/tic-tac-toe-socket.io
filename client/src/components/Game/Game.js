import React from "react";
import "./Game.css";
import { socket } from "../../Socket";
import { useLocation } from "react-router-dom";

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
        <div className="o">

        </div>
    );
}

function Game() {
    // const { initialGameData } = useLocation().state;
    const [gameData, setGameData] = React.useState(useLocation().state);

    function handleClick(row, col) {
        if (gameData.currentPlayer !== socket.player) return;
        if (gameData.board[row][col] === null) {
            let newGameData = { ...gameData };
            newGameData.board = [...gameData.board];
            newGameData.board[row][col] = socket.player;
            setGameData(newGameData);
            socket.emit("move", newGameData);
        }
    }

    React.useEffect(() => {
        // console.log(initialGameData);
        // setGameData(initialGameData);
        socket.on("move", (newData) => {
            setGameData(newData);
        });
    });

    return (
        <div className="game">
            <h1>Game</h1>
            <p>Room code: {gameData.room}</p>
            <p>You Play with: {socket.player}</p>
            <p>Turn: {gameData.currentPlayer === socket.player ? "Your Turn" : "Opponent's Turn"}</p>
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
