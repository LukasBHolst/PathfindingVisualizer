import { visualBFS } from './algorithms/BFS' ;
import { forwbf } from './algorithms/forwbf';

// When clicked on button for Breadth first search, start the search.
export function buttonBFS(board) {
    const button = document.getElementById('BFS');
    button.addEventListener('click', () => {
        visualBFS(board);
    }, false)
}

// scrapped algorithm for now
export function buttonforwBF(board) {
    const button = document.getElementById('ForwBF');
    button.addEventListener('click', () => {
        forwbf(board);
    }, false)
}