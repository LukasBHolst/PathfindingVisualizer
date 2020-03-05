import { Board } from './javascript/board.js';
import { buttonBFS, buttonBFSConv } from './javascript/buttons.js'


// Main class
let board = new Board(31, 51);
board.init();
buttonBFS(board);
buttonBFSConv(board);

