import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const navigatePathFinding = () => {
    navigate("/pathFinding");
  };

  const navigateSorting = () => {
    navigate("/sorting");
  };

  return (
    <div className="App">
      <button onClick={navigatePathFinding}>Path Finding</button>
      <button onClick={navigateSorting}>Sorting</button>
    </div>
  );
}

export default App;
