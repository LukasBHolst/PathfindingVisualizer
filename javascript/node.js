// Node class for each individual node
function Node(id, status) {
    this.id = id;
    this.status = status;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.isSelected = false;
}

module.exports = Node