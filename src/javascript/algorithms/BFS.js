import { toCoord, factortime, getNeighboursFromLeft } from '../helpers/helperfunctions.js'

// Wrapper function
export function visualBFS(board) {
    let shortestpath = BFS(board);
    animateBFS(board.sourceSet, shortestpath);

}


// Breadth first search algorithm
// Pretty bad run time and shouldnt be used seriously
function BFS(board) {
    // Source (from) node
    console.log(board.sourceNode)
    var source = board.sourceNode;

    // Target (to) node
    var target = board.targetNode;

    // Queue for FILO (First in last out) collection
    var Q = [];

    // Source node added to the queue
    source.visited = true;
    Q.unshift(source);
    while (Q.length != 0) {
        // If the last node in the queue is the target node.
        var v = Q.pop();
        board.sourceSet.push(v);
        if (v.id === target.id) {
            return v;
        }

        // Get neighbours and look at them, going further into the loop
        // Adding w node to animation list.
        getNeighboursFromLeft(v.id, board).forEach(w => {
            if (!w.visited) {
                w.status = "visited";
                w.visited = true;
                w.prev = v;
                Q.unshift(w);
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
            }, factortime(i, 10));
            return;
        }
        setTimeout(() => {
            const node = visitedNodes[i];
            document.getElementById(node.id).className = "visited";
        }, factortime(i, 10));
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
        }, factortime(i, 35));
    }
}