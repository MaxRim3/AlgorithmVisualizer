//depth first search

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const nextNodesStack = [];
  nextNodesStack.push(startNode);
  while (nextNodesStack.length) {
    const currentNode = nextNodesStack.pop();

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    if (
      !currentNode.isWall &&
      (currentNode.isStart || !currentNode.isVisited)
    ) {
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);

      const { col, row } = currentNode;
      let nextNode;

      //up
      if (row > 0) {
        nextNode = grid[row - 1][col];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      //down
      if (row < grid.length - 1) {
        nextNode = grid[row + 1][col];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
      //left
      if (col > 0) {
        nextNode = grid[row][col - 1];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }

      //right
      if (col < grid[0].length - 1) {
        nextNode = grid[row][col + 1];
        if (!nextNode.isVisited) {
          nextNode.previousNode = currentNode;
          nextNodesStack.push(nextNode);
        }
      }
    }
  }
}
