import { factortime, getNeighboursFromLeft, getNeighboursFromRight } from '../helpers/helperfunctions.js'

// Wrapper function
export function visualBFSConv(board) {
    animateBFSConv(board);
}

// The reason I call this file or algorithm BFSConv is because it
// is a convergence of two BFS algorithms.

// Bidirectional Breadth first search algorithm
// It's the same as the BFS but I also use BFS from the target node
// The second queue Q2 will always find the last element which connects
// the two searches, so naturally the targetSet will be +1 bigger than its
// counterpart set.
function BFS(board) {
    // Source (from) node
    var source = board.sourceNode;

    // Target (to) node
    var target = board.targetNode;

    // Queue for FILO (First in last out) collection
    var Q = [];
    var Q2 = [];

    // Source node added to the queue
    source.visited = true;
    target.visited = true;

    Q.unshift(source);
    Q2.unshift(target);


    // I introduced a variable running to help with stopping the loop
    // I also removed the old if statements because for some reason they do not
    // work well enough with bidirectional checks. So now I do a linear search
    // which works but is not the best solution. (.includes(node))
    let running = true;
    while (Q.length != 0 && Q2.length != 0 && running) {

        var forw = Q.pop();
        var back = Q2.pop();

        // Set check and put in animation sets.
        // Check is to avoid having to look through the
        // animation sets for a dup node, so we make check.
        // So that if the node is added to the sourceSet
        // and is looked on by the targetSet, then the function
        // will terminate because it is a dup node, meaning there is a path.
        forw.check = 'sourceSet';
        board.sourceSet.push(forw);
        back.check = 'targetSet';
        board.targetSet.push(back);

        getNeighboursFromRight(forw.id, board).forEach(nb => { 
            if (nb.check === 'targetSet') {
                board.targetSet.splice(board.targetSet.length - 1, 1);
                board.sourceSet.push(forw);
                board.targetSet.push(nb);
                running = false; 
            }
            if (!nb.visited) {
                nb.status = "visited";
                nb.visited = true;
                nb.prev = forw;
                Q.unshift(nb);

            }
        })

        getNeighboursFromLeft(back.id, board).forEach(nb2 => {
            if (nb2.check === 'sourceSet') {
                
                board.targetSet.splice(board.targetSet.length - 1, 1);
                board.targetSet.push(back);
                board.sourceSet.push(nb2);
                running = false;
            }
            if (!nb2.visited) {
                nb2.status = "visited";
                nb2.visited = true;
                nb2.prev = back;
                Q2.unshift(nb2);
            }
        })
    }
    console.log(board.sourceSet);
    console.log(board.targetSet)
    return [board.sourceSet[board.sourceSet.length - 1],
            board.targetSet[board.targetSet.length - 1]];
}


// The path is the two nodes whom together form the shortest path.
// I want the shortest path to form 1 step at a time respectively from the nodes.
function getInOrderShortestPathBFS(path) {
    var [sourcePath, targetPath] = path;
    var shortestPathList = [];
    for (let i = 0; i < board.targetSet.length; i++) {
        if (sourcePath != null) {
            shortestPathList.push(sourcePath);
            sourcePath = sourcePath.prev;
        }
        if (targetPath != null) {
            shortestPathList.push(targetPath);
            targetPath = targetPath.prev;
        }
    }
    return shortestPathList;
}


// Animates the shortest path for BFSConv
function animateShortestPathBFSConv(path) {
    var shortestPathList = getInOrderShortestPathBFS(path);
    for (let i = 0; i < shortestPathList.length; i++) {
        setTimeout(() => {
            const node = shortestPathList[i];
            document.getElementById(node.id).className = "shortestpath";
        }, factortime(i, 35));
    }
}

// First animate The BFS, then animate the shortest path.
function animateBFSConv(board) {
    let path = BFS(board);
    for (let i = 0; i <= board.sourceSet.length; i++) {
        if (i === board.sourceSet.length) {
            setTimeout(() => {
                animateShortestPathBFSConv(path);
            }, factortime(i, 10));
            return;
        }
        setTimeout(() => {
            const sourcy = board.sourceSet[i];
            const targety = board.targetSet[i];
            document.getElementById(sourcy.id).className = "visited";
            document.getElementById(targety.id).className = "visited";

            // The targetSet will always be 1 bigger so we get that last element here
            if (i+1 === board.sourceSet.length) {
                const targety = board.targetSet[board.targetSet.length - 1];
                document.getElementById(targety.id).className = "visited";
            }
        }, factortime(i, 10));
    }
}

