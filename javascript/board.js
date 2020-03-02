// Node class for each individual node
function Node(id, status) {
    this.id = id;
    this.status = status;
    this.distance = Infinity;
    this.prev = null;
    this.neighbours = [];
    this.isSelected = false;
}

// Board class for the grid board
function Board(width, height) {
    this.width = width;
    this.height = height;
    this.nodeset = [];
    this.animateset = [];
    this.sourceId = null;
    this.sourceNode = null;
    this.targetId = null;
    this.targetNode = null;
    create(this.width, this.height);
}

// Breadth first search algorithm
function BFS() {
    // The greaph
    graph = this.nodeset;

    // Source (from) node
    source = this.sourceNode;

    // Target (to) node
    target = this.targetNode;

    // Queue for FILO (First in last out) collection
    var Q = [];

    // Source node added to the queue
    source.visited = true;
    enqueue(source, Q);
    while (Q.length != 0) {
        // If the last node in the queue is the target node.
        v = dequeue(Q);
        if (v.id === this.target.id) {
            return v;
        }

        // Get neighbours and look at them, going further into the loop
        // Adding w node to animation list.
        getNeighbours(v.id, graph).forEach(w => {
            this.animateset.push(w);
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
        console.log(i === visitedNodes.length);
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
    shortestPathList = [];
    while (node != null) {
        shortestPathList.unshift(node);
        node = node.prev;
    }
    return shortestPathList;
}

// Animates the shortest path for BFS
function animateShortestPathBFS(node) {
    shortestPathList = getInOrderShortestPathBFS(node);
    for (let i = 0; i < shortestPathList.length; i++) {
        setTimeout(() => {
            const node = shortestPathList[i];
            document.getElementById(node.id).className = "shortestpath";
        }, 10 * i);
    }
}

// Wrapper function
function visualizeBFS() {
    let shortestpath = BFS();
    animateBFS(this.animateset, shortestpath);

}

// Get node in the nodeset by ID
function getNodeById(nodeId, nodeset) {
    let [row, col] = toCoord(nodeId);
    let row2, col2 = 0;
    nodeset.forEach(node => {
        [row2, col2] = toCoord(node.id);
        if (row2 === row && col2 === col) {
            console.log(row2 + " " + col2 + "\n" + row1 + " " + col1);
            return node;
        }
    })
}

// Queue add function
function enqueue(e, list) {
    list.unshift(e)
}

// Queue remove function
function dequeue(list) {
    return list.splice(-1).pop()
}

// From nodeid to row and col
function toCoord(nodeId) {
    let row = parseInt(nodeId.toString().split('-')[0])
    let col = parseInt(nodeId.toString().split('-')[1])
    return [row, col]
}

// Find all neighbours. This is done in O(n) though.
// So it's O(n^2) if you use this on every node on the board.
function getNeighbours(nodeId, nodeset) {
    let neighbours = [];
    let [row1, col1] = toCoord(nodeId);
    let row2, col2 = 0;
    nodeset.forEach(node => {
        [row2, col2] = toCoord(node.id);
        if (row2 === row1-1 && col2 === col1) {
            neighbours.push(node);
        } else if (row2 === row1+1 && col2 === col1) {
            neighbours.push(node);
        } else if (row2 === row1 && col2 === col1-1) {
            neighbours.push(node);
        } else if (row2 === row1 && col2 === col1+1) {
            neighbours.push(node);
        }
    });
    return neighbours
}

// Create function to create the board
function create() {
    var html = "<table>";
    let neighbours = [];

    s_x = Math.floor(self.width * 0.2);
    s_y = Math.floor(self.height * 0.1);
    t_x = Math.floor(self.width * 0.70)
    t_y = Math.floor(self.height * 0.95)

    for (let row = 0; row < this.width; row++) {
        html += `<tr id='row ${row}'>`;

        for (let col = 0; col < this.height; col++) {
            let nodeid = `${row}-${col}`;


            if (row === s_x && col === s_y) {
                nodestatus = "source";
                this.sourceId = nodeid;

            } else if (row === t_x && col === t_y) {
                nodestatus = "target";
                this.targetId = nodeid;

            } else {
                nodestatus = "unvisited";
            }
            node = new Node(nodeid, nodestatus);
            if (nodestatus === "source") {
                this.sourceNode = node;
            } else if (nodestatus === "target") {
                this.targetNode = node;
            }
            this.nodeset.push(node);
            html += `<td id='${nodeid}' class='${nodestatus}'></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";


    document.getElementById("container").innerHTML = html;
}

// main, for now
Board(30, 60)
