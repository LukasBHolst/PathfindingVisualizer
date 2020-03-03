// Queue add function
export function enqueue(e, list) {
    list.unshift(e)
}


// Queue remove function
export function dequeue(list) {
    return list.splice(-1).pop()
}


// From nodeid to row and col
export function toCoord(nodeId) {
    let row = parseInt(nodeId.toString().split('-')[0])
    let col = parseInt(nodeId.toString().split('-')[1])
    return [row, col]
}
