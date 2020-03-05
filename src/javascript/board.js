import { Node } from './node.js'
import { toCoord, isNeighboursWall } from './helpers/helperfunctions.js'


// Board class for the grid board
export function Board(height, width) {
    this.width = width;
    this.height = height;
    this.nodeset = [];
    this.sourceSet = [];
    this.targetSet = [];
    this.arraySet = [];
    this.sourceId = null;
    this.sourceNode = null;
    this.targetId = null;
    this.targetNode = null;
    this.isMouseDown = false;
}


Board.prototype.init = function() {
    this.create();
    this.addEventListener();
}


// Create function to create the board
Board.prototype.create = function() {
    var html = "<table>";
    let arraySet = new Array(this.height);

    var s_x = Math.floor(this.height * 0.50);
    var s_y = Math.floor(this.width * 0.1);
    var t_x = Math.floor(this.height * 0.50)
    var t_y = Math.floor(this.width * 0.90)

    for (let row = 0; row < this.height; row++) {
        html += `<tr id='row ${row}'>`;
        arraySet[row] = new Array(this.width);

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
            arraySet[row][col] = node;
            this.nodeset.push(node);
            html += `<td id='${nodeid}' class='${nodestatus}'></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";

    this.arraySet = arraySet;
    document.getElementById("container").innerHTML = html;

    console.log(this.getNode(`${15}-${25}`));
}

Board.prototype.getNode = function(nodeId) {
    let [row, col] = toCoord(nodeId)
    if (this.height >= row >= 0 || this.width > col >= 0) {
        return this.arraySet[row][col];
    } else {
        console.log("Node outside board");
    }
}

Board.prototype.addEventListener = function() {
    let isSource = false;
    let isTarget = false;
    for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
            let curId = `${row}-${col}`;
            let curNode = this.getNode(curId);
            let htmlNode = document.getElementById(curId);
            htmlNode.onmousedown = (e) => {
                if (!(this.isMouseDown)) {
                    if (curNode.id !== this.sourceId && curNode.id !== this.targetId) {
                        e.preventDefault();
                        curNode.status = 'wall';
                        htmlNode.className = 'wall';
                        this.isMouseDown = true;
                    }
                    if (curNode.id === this.sourceId) {
                        isSource = true;
                    }
                    if (curNode.id === this.targetId) {
                        isTarget = true;
                    }
                }
            }
            htmlNode.onmouseenter = () => {
                if (this.isMouseDown && curNode.id !== this.sourceId && curNode.id !== this.targetId) {
                    curNode.status = 'wall';
                    htmlNode.className = 'wall';
                }
                if (isSource) {
                    curNode.status = 'source';
                    htmlNode.className = 'source';
                }
                if (isTarget) {
                    curNode.status = 'target';
                    htmlNode.className = 'target';
                }
            }
            htmlNode.onmouseleave = () => {
                if (isSource || isTarget) {
                    curNode.className = 'unvisited';
                    htmlNode.className = 'unvisited';
                }
            }
            htmlNode.onmouseup = () => {
                if (isSource) {
                    curNode.status = 'source';
                    htmlNode.className = 'source';
                    this.sourceNode = curNode;
                    this.sourceId = curNode.id;
                    isSource = false;
                }
                if (isTarget) {
                    curNode.status = 'target';
                    htmlNode.className = 'target';
                    this.targetNode = curNode;
                    this.targetId = curNode.id;
                    isTarget = false;
                }
            }
            document.body.onmouseup = () => {
                this.isMouseDown = false;
            }
        }
    }
}


