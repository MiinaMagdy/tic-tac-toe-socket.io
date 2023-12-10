import React from "react";
import { useLocation } from "react-router-dom";
import {io} from "socket.io-client";
import { useNavigate } from "react-router";
function WaitingForOthers() {
    const {room} = useLocation().state;
    const socket = io("http://localhost:3000");
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