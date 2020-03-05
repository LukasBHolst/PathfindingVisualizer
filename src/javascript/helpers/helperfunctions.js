// From nodeid to row and col
export function toCoord(nodeId) {
    let row = parseInt(nodeId.toString().split('-')[0])
    let col = parseInt(nodeId.toString().split('-')[1])
    return [row, col]
}

export function factortime(i, num) { return (i * num) }

// Find all neighbours in order of left, right, up, down.
// Done in O(1)
export function getNeighboursFromLeft(nodeId, board) {
    let neighbours = [];
    let [row, col] = toCoord(nodeId);
    if (col > 0 && board.arraySet[row][col-1].status !== 'wall') {
        neighbours.push(board.arraySet[row][col-1]);
    } 
    if (col < board.width - 1 && board.arraySet[row][col+1].status !== 'wall') {
        neighbours.push(board.arraySet[row][col+1]);
    }
    if (row > 0 && board.arraySet[row-1][col].status !== 'wall') {
        neighbours.push(board.arraySet[row-1][col]);
    } 
    if (row < board.height - 1 && board.arraySet[row+1][col].status !== 'wall') {
        neighbours.push(board.arraySet[row+1][col]);
    }
    return neighbours
}

// Find all neighbours in order of right, left, up, down
// Just for a prettier bidirectional look, but if you switch
// spots for target and source, it will not look as pretty
export function getNeighboursFromRight(nodeId, board) {
    let neighbours = [];
    let [row, col] = toCoord(nodeId);
    if (col < board.width - 1 && board.arraySet[row][col+1].status !== 'wall') {
        neighbours.push(board.arraySet[row][col+1]);
    }
    if (col > 0 && board.arraySet[row][col-1].status !== 'wall') {
        neighbours.push(board.arraySet[row][col-1]);
    } 
    if (row > 0 && board.arraySet[row-1][col].status !== 'wall') {
        neighbours.push(board.arraySet[row-1][col]);
    } 
    if (row < board.height - 1 && board.arraySet[row+1][col].status !== 'wall') {
        neighbours.push(board.arraySet[row+1][col]);
    }
    return neighbours
}


