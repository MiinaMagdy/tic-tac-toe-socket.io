import React from "react";
import "./Game.css";
import { socket } from "../../Socket";

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
    const [board, setBoard] = React.useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);

    const [turn, setTurn] = React.useState(true); // true for "X", false for "O"

    function handleClick(row, col) {
        if (board[row][col] === null) {
            let newBoard = [...board];
            newBoard[row][col] = turn ? "X" : "O";
            setBoard(newBoard);
            setTurn(!turn); // Switch turns
            socket.emit("move", newBoard);
        }
    }

    React.useEffect(() => {
        socket.on("move", (newBoard) => {
            setBoard(newBoard);
            setTurn(!turn); // Switch turns
        });
    }, [turn]);

    return (
        <div className="game">
            <h1>Game</h1>
            <div className="board">
                {board.map((row, rowIndex) => (
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
