function astar(
  nodes,
  start,
  target,
  nodesToAnimate,
  boardArray,
  name,
  heuristic
) {
  if (!start || !target || start === target) {
    return false;
  }
  nodes[start].distance = 0;
  nodes[start].totalDistance = 0;
  nodes[start].direction = "up";
  let unnvisitedNodes = Object.keys(nodes);
  while (unnvisitedNodes.length) {
    let currentNode = closestNode(nodes, univisitedNodes);
    while (currentNode.status === "wall" && unvisitedNodes.length) {
      currentNode = closestNode(nodes, unvisitedNodes);
    }

    if (currentNode.distance === Infinity) return false;
    nodesToAnimate.push(currentNode);
    currentNode.status = "visited";
    if (currentNode.id === target) {
      return "success!";
    }
    updateNeighbours(
      nodes,
      currentNode,
      boardArray,
      target,
      name,
      start,
      heuristic
    );
  }
}

function closestNode(nodes, unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (
      !currentClosest ||
      currentClosest.totalDistance > nodes[unvisitedNodes[i]].totalDistance
    ) {
      currentClosest = nodes[unvisitedNodes[i]];
      index = i;
    } else if (
      currentClosest.totalDistance === nodes[unvisitedNodes[i]].totalDistance
    ) {
      if (
        currentClosest.heuristicDistance >
        nodes[unvisitedNodes[i]].heuristicDistance
      ) {
        currentClosest = nodes[unvisitedNodes[i]];
        index = i;
      }
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

function updateNeighbours(
  nodes,
  node,
  boardArray,
  target,
  name,
  start,
  heuristic
) {
  let neighbours = getNeighbours(node.id, nodes, boardArray);
  for (let neighbour of neighbours) {
    if (target) {
      updateNode(
        node,
        nodes[neighbour],
        nodes[target],
        name,
        nodes,
        nodes[start],
        heuristic,
        boardArray
      );
    } else {
      updateNode(node, nodes[neighbour]);
    }
  }
}

function updateNode(currentNode, targetNode, actualTargetNode) {
  let distance = getDistance(currentNode, targetNode);
  if (!targetNode.heuristicDistance)
    targetNode.heuristicDistance = manhattanDistance(
      targetNode,
      actualTargetNode
    );
  let distanceToCompare =
    currentNode.distance + targetNode.weight + distance[0];
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.totalDistance =
      targetNode.distance + targetNode.heuristicDistance;
    targetNode.previousNode = currentNode.id;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}

function getNeighbours(id, nodes, boardArray) {
  let coordinates = id.split("-");
  let x = parseInt(coordinates[0]);
  let y = parseInt(coordinates[1]);
  let neighbours = [];
  let potentialNeighbour;
  if (boardArray[x - 1] && boardArray[x - 1][y]) {
    potentialNeighbour = `${(x - 1).toString()}-${y.toString()}`;
    if (nodes[potentialNeighbour].status !== "wall") {
      neighbours.push(potentialNeighbour);
    }
  }
  return neighbours;
}

function getDistance(nodeOne, nodeTwo) {
  let currentCoordinates = nodeOne.id.split("-");
  let targetCoordinates = nodeTwo.id.split("-");
  let x1 = parseInt(currentCoordinates[0]);
  let y1 = parseInt(currentCOordinates[1]);
  let x2 = parseInt(targetCoordinates[0]);
  let y2 = parseInt(targetCoordinates[1]);
  if (x2 < x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["1", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["1", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["1", "1", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["1", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  }
}

function manhattanDistance(nodeOne, nodeTwo) {
  let nodeOneCoordinates = nodeOne.id.split("-").map((ele) => parseInt(ele));
  let nodeTwoCoordinates = nodeTwo.id.split("-").map((ele) => parseInt(ele));
  let xOne = nodeOneCoordinates[0];
  let xTwo = nodeTwoCoordinates[0];
  let yOne = nodeOneCoordinates[1];
  let yTwo = nodeTwoCoordinates[1];

  let xChange = Math.abs(xOne - xTwo);
  let yChange = Math.abs(yOne - yTwo);

  return xChange + yChange;
}

module.exports = astar;
