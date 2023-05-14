import { buildGame } from './js/init';
import { calculateFps } from './js/utils';
import { inputs } from './js/keyEvent';
import { Square } from './tetraminos/square.js';

const SQUARE_STATES = ['empty', 'piece', 'freezePiece'];
const GAME_SIZE = { x: 10, y: 18 }
let currentFrame = 0;
const speed = 40;
const speedLimit = 5;
const PIECES = [Square];
let currentPiece = null;

const game = buildGame(GAME_SIZE);

window.requestAnimationFrame(gameLoop);
function gameLoop(timeStamp) {
  if (!currentPiece || !currentPiece.active) {
    currentPiece = addPiece();
  }
  currentFrame++;
  printGame(game);
  printPiece(currentPiece.position);

  // console.log(calculateFps(timeStamp));
  if (currentFrame % speedLimit === 0) {
    movePiece(currentPiece, inputs);
  }

  if (currentFrame % speed === 0) {
    const result = movePieceDown(currentPiece, game);
    if(result === 'GAME_OVER') return console.log('GAME_OVER')
  }
  window.requestAnimationFrame(gameLoop);
}

function addPiece() {
  return new PIECES[0]();
}

function printGame(game) {
  for (let i = 0; i < game.length; i++) {
    const row = game[i];
    for (let j = 0; j < row.length; j++) {
      const colValue = row[j];
      const htmlsquare = document.querySelector(`.row_${i}.col_${j}`);
      SQUARE_STATES.forEach(state => htmlsquare.classList.remove(state));
      htmlsquare.classList.add(SQUARE_STATES[colValue]);
    }
  }
}


function printPiece(position) {
  position.forEach(({ x, y }) => {
    if (y >= 0) {
      const htmlsquare = document.querySelector(`.row_${y}.col_${x}`);
      SQUARE_STATES.forEach(state => htmlsquare.classList.remove(state));
      htmlsquare.classList.add(SQUARE_STATES[1]);
    }
  });
}

function movePiece(piece, inputs) {
  if (inputs.includes('LEFT')) {
    if (canIMove(piece, -1)) piece.left();
  }
  if (inputs.includes('RIGHT')) {
    if (canIMove(piece, 1)) piece.right();
  }

  if (inputs.includes('DOWN')) {
    if (canIMove(piece, 0, 1)) piece.down();
  }
}

function movePieceDown(piece, game) {
  if (canIMove(piece, 0, 1)) piece.down();
  else return freezePiece(game, piece) ;
}
function canIMove(piece, dx, dy = 0) {
  let canMove = true;
  const position = piece.position.map(({ x, y }) => ({ x: x + dx, y: y + dy }));
  position.forEach(({ x, y }) => {
    if (y >= 0) {
      if(isOutOfBand(x, y)) {
        canMove = false;
      } else {
        const gp = game[y][x];
        if (gp !== 0) {
          canMove = false;
        }
      }
    }
  });
  return canMove;
}

function freezePiece(game, piece) {
  let gameState = 'ok'
  for (const {x, y} of piece.position) {
    if(y < 0) gameState = 'GAME_OVER'
    else game[y][x] = 2;
  }
  piece.active = false;
  return gameState;
}

function isOutOfBand(x, y) {
  return x < 0 || x > GAME_SIZE.x || y > GAME_SIZE.y - 1
}