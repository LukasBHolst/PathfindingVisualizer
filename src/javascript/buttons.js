import { visualBFS } from './algorithms/BFS' ;
import { visualBFSConv } from './algorithms/BFSConv';

// When clicked on button for Breadth first search, start the search.
export function buttonBFS(board) {
    const button = document.getElementById('BFS');
    button.addEventListener('click', () => {
        visualBFS(board);
    }, false)
}

// scrapped algorithm for now
export function buttonBFSConv(board) {
    const button = document.getElementById('BFSConv');
    button.addEventListener('click', () => {
        visualBFSConv(board);
    }, false)
}