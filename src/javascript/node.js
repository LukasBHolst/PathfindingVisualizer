// Node class for each individual node
export function Node(id, status) {
    this.id = id;
    this.status = status;
    this.distance = Infinity;
    this.prev = null;
    this.neighbours = [];
    this.isSelected = false;
}