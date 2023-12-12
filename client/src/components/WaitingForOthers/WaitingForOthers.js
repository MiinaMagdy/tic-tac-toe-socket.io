import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";

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
      <h1>Waiting for others...</h1>
      <p>Room code: {room}</p>
    </div>
  );
}

export default WaitingForOthers;
