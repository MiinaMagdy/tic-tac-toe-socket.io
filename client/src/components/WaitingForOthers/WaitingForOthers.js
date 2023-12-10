import React from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../Socket";
import { useNavigate } from "react-router";
function WaitingForOthers() {
    const {room} = useLocation().state;
    const navigate = useNavigate();
    socket.on("room joined", (room) => {
        console.log("room joined");
        navigate("/Game", {state: {room: room}});
    });
    return (    
      <div className="waiting-for-others">
        <h1>Waiting for others...</h1>
          <p>Room code: {room}</p>
      </div>
    );
}

export default WaitingForOthers;