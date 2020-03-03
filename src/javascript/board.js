import { Node } from './node.js'
import { toCoord } from './helpers/helperfunctions.js'


// Board class for the grid board
export function Board(height, width) {
    this.width = width;
    this.height = height;
    this.nodeset = [];
    this.animateset = [];
    this.arrayset = [];
    this.sourceId = null;
    this.sourceNode = null;
    this.targetId = null;
    this.targetNode = null;
}


Board.prototype.init = function() {
    this.create();
    this.addEventListener();
}


// Create function to create the board
Board.prototype.create = function() {
    var html = "<table>";
    let arrayset = new Array(this.height);

    var s_x = Math.floor(this.height * 0.5);
    var s_y = Math.floor(this.width * 0.5);
    var t_x = Math.floor(this.height * 0.70)
    var t_y = Math.floor(this.width * 0.95)

    for (let row = 0; row < this.height; row++) {
        html += `<tr id='row ${row}'>`;
        arrayset[row] = new Array(this.width);

        for (let col = 0; col < this.width; col++) {
            var nodeid = `${row}-${col}`;


            if (row === s_x && col === s_y) {
                var nodestatus = "source";
                this.sourceId = nodeid;

            } else if (row === t_x && col === t_y) {
                var nodestatus = "target";
                this.targetId = nodeid;

            } else {
                var nodestatus = "unvisited";
            }
            var node = new Node(nodeid, nodestatus);
            if (nodestatus === "source") {
                this.sourceNode = node;
            } else if (nodestatus === "target") {
                this.targetNode = node;
            }
            arrayset[row][col] = node;
            this.nodeset.push(node);
            html += `<td id='${nodeid}' class='${nodestatus}'></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    this.arrayset = arrayset;
    document.getElementById("container").innerHTML = html;

    console.log(this.getNode(`${15}-${25}`));
}

Board.prototype.getNode = function(nodeId) {
    let [row, col] = toCoord(nodeId)
    if (this.height >= row >= 0 || this.width > col >= 0) {
        return this.arrayset[row][col];
    } else {
        console.log("Node outside board");
    }
}

Board.prototype.addEventListener = function() {
    for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
            let curId = `${row}-${col}`;
            let curNode = this.getNode(curId);
            let htmlNode = document.getElementById(curId);
            htmlNode.onmousedown = () => {
                htmlNode.className = 'visited';
            }
        }
    }
}


