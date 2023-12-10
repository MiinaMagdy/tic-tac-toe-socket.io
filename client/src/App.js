import './App.css';
import WelcomePage from './components/WelcomePage/WelcomePage';
import JoinGame from './components/JoinGame/JoinGame';
import WaitingForOthers from './components/WaitingForOthers/WaitingForOthers';
import Game from './components/Game/Game';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/JoinGame" element={<JoinGame />} />
          <Route path="/WaitingForOthers" element={<WaitingForOthers />} />
          <Route path="/Game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;