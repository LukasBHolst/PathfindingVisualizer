// Node class for each individual node
function Node(id, status) {
    this.id = id;
    this.status = status;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.isSelected = false;
}

// Board class for the grid board
function Board(width, height) {
    this.width = width;
    this.height = height;
    this.start = null;
    this.target = null;
    create(this.width, this.height);
}

// Create function to create the board
function create() {
    var html = "<table>";

    s_x = Math.floor(self.width / 2);
    s_y = Math.floor(self.height / 2 / 3.2);
    t_x = Math.floor(self.width / 2)
    t_y = Math.floor(self.height * 0.85)

    for (let row = 0; row < this.width; row++) {
        html += `<tr id='row ${row}'>`;

        for (let col = 0; col < this.height; col++) {
            let nodeid = `${row}-${col}`;

            if (row === s_x && col === s_y) {
                nodestatus = "start";
                this.start = nodeid;

            } else if (row === t_x && col === t_y) {
                nodestatus = "target";
                this.target = nodeid;

            } else {
                nodestatus = "unvisited";
            }
            node = new Node(nodeid, nodestatus);
            html += `<td id='${nodeid}' class='${nodestatus}'></td>`;
        }
        html += "</tr>";
    }
    html += "</table>";


    document.getElementById("container").innerHTML = html;
}

// main, for now
Board(30, 50)
