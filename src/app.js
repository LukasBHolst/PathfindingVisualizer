import { Board } from './javascript/board.js';
import { buttonBFS, buttonforwBF } from './javascript/buttons.js'


// Main class
let board = new Board(30, 50);
board.init();
buttonBFS(board);


