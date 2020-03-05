// Node class for each individual node
export function Node(id, status) {
    this.id = id;
    this.status = status;
    this.visited = false;
    this.check = ''; // Additional status check
    this.distance = Infinity;
    this.prev = null;
    this.neighbours = [];
    this.isSelected = false;
}