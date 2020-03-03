import { enqueue, dequeue, toCoord } from '../helpers/helperfunctions.js'

// Wrapper function
export function visualBFS(board) {
    let shortestpath = BFS(board);
    animateBFS(board.animateset, shortestpath);

}


// Breadth first search algorithm
// Pretty bad run time and shouldnt be used seriously
function BFS(board) {
    // The graph
    var graph = board.nodeset;

    // Source (from) node
    var source = board.sourceNode;

    // Target (to) node
    var target = board.targetNode;

    // Queue for FILO (First in last out) collection
    var Q = [];

    // Source node added to the queue
    source.visited = true;
    enqueue(source, Q);
    while (Q.length != 0) {
        // If the last node in the queue is the target node.
        var v = dequeue(Q);
        if (v.id === target.id) {
            return v;
        }

        // Get neighbours and look at them, going further into the loop
        // Adding w node to animation list.
        getNeighbours(v.id, board).forEach(w => {
            board.animateset.push(w);
            if (!w.visited) {
                w.status = "visited";
                w.visited = true;
                w.prev = v;
                enqueue(w, Q);
            }
        })
    }
}


// First animate The BFS, then animate the shortest path.
function animateBFS(visitedNodes, target) {
    for (let i = 0; i <= visitedNodes.length; i++) {
        if (i === visitedNodes.length) {
            setTimeout(() => {
                animateShortestPathBFS(target)
            }, 2 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(node.id).className = "visited";
        }, 2 * i);
    }
}


// The last node in the BFS search function is in a linked list
// with the nodes that form the shortest path. Add them to a list.
function getInOrderShortestPathBFS(node) {
    var shortestPathList = [];
    while (node != null) {
        shortestPathList.unshift(node);
        node = node.prev;
    }
    return shortestPathList;
}


// Animates the shortest path for BFS
function animateShortestPathBFS(node) {
    var shortestPathList = getInOrderShortestPathBFS(node);
    for (let i = 0; i < shortestPathList.length; i++) {
        setTimeout(() => {
            const node = shortestPathList[i];
            document.getElementById(node.id).className = "shortestpath";
        }, 10 * i);
    }
}


// Get node in the nodeset by ID
function getNodeById(nodeId, nodeset) {
    let [row, col] = toCoord(nodeId);
    let row2, col2 = 0;
    nodeset.forEach(node => {
        [row2, col2] = toCoord(node.id);
        if (row2 === row && col2 === col) {
            return node;
        }
    })
}


// Find all neighbours. Now done in O(1)
function getNeighbours(nodeId, board) {
    let neighbours = [];
    let [row, col] = toCoord(nodeId);
    if (col > 0) {
        neighbours.push(board.arrayset[row][col-1]);
    } 
    if (col < board.width - 1) {
        neighbours.push(board.arrayset[row][col+1]);
    }
    if (row > 0) {
        neighbours.push(board.arrayset[row-1][col]);
    } 
    if (row < board.height - 1) {
        neighbours.push(board.arrayset[row+1][col]);
    }
    return neighbours
}