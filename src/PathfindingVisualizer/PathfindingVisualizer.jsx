import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import { astar } from "../algorithms/astar";
import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { dfsh } from "../algorithms/dfsh";

import "./PathfindingVisualizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  clearGrid() {
    const newGrid = this.state.grid.slice();
    for (const row of newGrid) {
      for (const node of row) {
        let nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-finish" &&
          nodeClassName !== "node node-wall"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
          node.isVisited = false;
          node.distance = Infinity;
          node.distanceToFinishNode =
            Math.abs(FINISH_NODE_ROW - node.row) +
            Math.abs(FINISH_NODE_COL - node.col);
        }
        if (nodeClassName === "node node-finish") {
          node.isVisited = false;
          node.distance = Infinity;
          node.distanceToFinishNode = 0;
          node.isFinish = true;
        }
        if (nodeClassName === "node node-start") {
          node.isVistied = false;
          node.distance = Infinity;
          node.distanceToFinishNode =
            Math.abs(FINISH_NODE_ROW - node.row) +
            Math.abs(FINISH_NODE_COL - node.col);
          node.isStart = true;
          node.isWall = false;
          node.previousNode = null;
        }
      }
    }
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * i);
    }
  }

  visualizeAlgorithm(algorithm) {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder;
    switch (algorithm) {
      case "dijkstra":
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
      case "astar":
        visitedNodesInOrder = astar(grid, startNode, finishNode);
        break;
      case "bfs":
        visitedNodesInOrder = bfs(grid, startNode, finishNode);
        break;
      case "dfs":
        visitedNodesInOrder = dfs(grid, startNode, finishNode);
        break;
      case "dfsh":
        visitedNodesInOrder = dfsh(grid, startNode, finishNode);
        break;
      default:
        visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        break;
    }
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        const nodeClassName = document.getElementById(
          `node-${node.row}-${node.col}`
        ).className;
        if (
          nodeClassName !== "node node-start" &&
          nodeClassName !== "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  render() {
    const { grid, mouseIsPressed } = this.state;
    return (
      <>
        <button onClick={() => this.visualizeAlgorithm("dijkstra")}>
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm("astar")}>
          Visualize Astar Algorithm
        </button>
        <button onClick={() => this.visualizeAlgorithm("bfs")}>
          Breadth First Search
        </button>
        <button onClick={() => this.visualizeAlgorithm("dfs")}>
          Depth First Search
        </button>
        <button onClick={() => this.visualizeAlgorithm("dfsh")}>
          Depth First Search - Height
        </button>
        <button onClick={() => this.clearGrid()}>Clear</button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      col={col}
                      row={row}
                      key={nodeIdx}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    distanceToFinishNode:
      Math.abs(FINISH_NODE_ROW - row) + Math.abs(FINISH_NODE_COL - col),
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
