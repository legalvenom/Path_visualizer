export function Dijkstra(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    let unvisitedNodes = [];
    startNode.distance = 0;
    unvisitedNodes.push(startNode);
    let visitedNodesInOrder = [];

    while (unvisitedNodes.length !== 0) {
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        let closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid, unvisitedNodes);
    }
    return visitedNodesInOrder;
}

function updateUnvisitedNeighbors(node, grid, unvisitedNodes) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1; // Since we're using a grid, the distance between neighbors is 1
        neighbor.previousNode = node;
        unvisitedNodes.push(neighbor);
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrderDijkstra(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
