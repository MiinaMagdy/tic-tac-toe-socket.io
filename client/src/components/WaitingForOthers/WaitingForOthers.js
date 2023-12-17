import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";
import "./WaitingForOthers.css";
import { WhatsappShareButton, WhatsappIcon } from "react-share";

function WaitingForOthers() {
  const { room } = useLocation().state;
  const navigate = useNavigate();
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const handleStartGame = (data) => {
      setGameData(data);
    };

    socket.on("start game", handleStartGame);

    // Clean up on component unmount
    // return () => {
    //   socket.off("start game", handleStartGame);
    // };
  }, []);

  useEffect(() => {
    // Navigate when gameData is updated
    if (gameData) {
      navigate("/Game", { state: gameData });
    }
  }, [gameData, navigate]);

  return (
    <div className="waiting-for-others">
      <h1>Waiting for others</h1>
      <div className="room">
        <div 
          className="room-code"
          onClick={() => {
            navigator.clipboard.writeText(room);
            const copied = document.querySelector(".room-code");
            copied.innerHTML = "Copied!";
            setTimeout(() => {
              copied.innerHTML = `Room code: ${room}`;
            }, 1000);
          }}
        >
          <p>Room code:</p>
          <p>{room}</p>
        </div>
        <WhatsappShareButton
          title={`Join my game of Tic Tac Toe! Room code: ${room}`}
          url={`https://tec-tac-toe.onrender.com/`}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>

      </div>
    </div>
  );
}

export default WaitingForOthers;
