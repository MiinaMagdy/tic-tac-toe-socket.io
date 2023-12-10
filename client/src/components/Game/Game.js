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
    const { room } = useLocation().state;
    const [board, setBoard] = React.useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);


    function handleClick(row, col) {
        if (!socket.inTurn) return;
        if (board[row][col] === null) {
            let newBoard = [...board];
            newBoard[row][col] = socket.player;
            setBoard(newBoard);
            socket.emit("move", { room: room, board: newBoard });
        }
    }

    React.useEffect(() => {
        socket.on("move", (data) => {
            setBoard(data.board);
            socket.inTurn = !socket.inTurn;
        });
    }, []);

    return (
        <div className="game">
            <h1>Game</h1>
            <p>Room code: {room}</p>
            <p>You Play with: {socket.player}</p>
            <p>Turn: {socket.inTurn ? "Your Turn" : "Opponent's Turn"}</p>
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
