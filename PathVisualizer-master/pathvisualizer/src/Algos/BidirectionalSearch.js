export function BidirectionalSearch(grid, startNode, finishNode) {
    if (!startNode || !finishNode || startNode === finishNode) {
        return false;
    }

    let forwardQueue = [startNode];
    let backwardQueue = [finishNode];
    let visitedNodesInOrder = [];

    while (forwardQueue.length !== 0 && backwardQueue.length !== 0) {
        // Perform a step in the forward search
        const forwardNode = forwardQueue.shift();
        if (forwardNode.isWall) continue;
        if (backwardQueue.includes(forwardNode)) return visitedNodesInOrder;
        visitedNodesInOrder.push(forwardNode);
        forwardNode.isVisited = true;
        let forwardNeighbors = getUnvisitedNeighbors(forwardNode, grid);
        forwardQueue.push(...forwardNeighbors);

        // Perform a step in the backward search
        const backwardNode = backwardQueue.shift();
        if (backwardNode.isWall) continue;
        if (forwardQueue.includes(backwardNode)) return visitedNodesInOrder;
        visitedNodesInOrder.push(backwardNode);
        backwardNode.isVisited = true;
        let backwardNeighbors = getUnvisitedNeighbors(backwardNode, grid);
        backwardQueue.push(...backwardNeighbors);
    }

    return visitedNodesInOrder;
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

export function getNodesInShortestPathOrderBidirectional(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
