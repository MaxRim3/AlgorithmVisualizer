import React from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import { Routes, Route, useNavigate } from "react-router-dom";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";

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
      <Routes>
        <Route path="/pathFinding" element={<PathfindingVisualizer />} />
        <Route path="/sorting" element={<SortingVisualizer />} />
      </Routes>
    </div>
  );
}

export default App;
