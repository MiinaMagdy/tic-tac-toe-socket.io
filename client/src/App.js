import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import  {io} from 'socket.io-client';

function App() {

  const connectSocket = async () => {
    const socket = io('http://localhost:3000');

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
  };

  useEffect(() => {
    connectSocket();
  } ,[]);

  return (
    <div className="App">
      <h1> HELLO WORLD </h1>
    </div>
  );
}

export default App;