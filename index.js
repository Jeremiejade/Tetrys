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
  if (printGame(game) !== 'OK') return;
  printPiece(currentPiece.position);

  // console.log(calculateFps(timeStamp));
  if (currentFrame % speedLimit === 0) {
    movePiece(currentPiece, inputs);
  }

  if (currentFrame % speed === 0) {
    movePieceDown(currentPiece, game)
  }
  window.requestAnimationFrame(gameLoop);
}

function addPiece() {
  return new PIECES[0]();
}

function printGame(game) {
  for (const rowKey in game) {
    const row = game[rowKey];
    for (const colKey in row) {
      const colValue = row[colKey];
      const htmlsquare = document.querySelector(`.${rowKey}.${colKey}`);
      if (!htmlsquare) {
        console.log('no existing element');
        return 'STOP';
      }
      SQUARE_STATES.forEach(state => htmlsquare.classList.remove(state));
      htmlsquare.classList.add(SQUARE_STATES[colValue]);
    }
  }
  return 'OK';
}

function printPiece(position) {
  position.forEach(({ x, y }) => {
    if (y >= 1) {
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
  else freezePiece(game, piece);
}
function canIMove(piece, dx, dy = 0) {
  let canMove = true;
  const position = piece.position.map(({ x, y }) => ({ x: x + dx, y: y + dy }));
  position.forEach(({ x, y }) => {
    if (y >= 1) {
      if(isOutOfBand(x, y)) {
        canMove = false;
      } else {
        const gp = game[`row_${y}`][`col_${x}`];
        if (gp !== 0) {
          canMove = false;
        }
      }
    }
  });
  return canMove;
}

function freezePiece(game, piece) {
  piece.position.forEach(({ x, y }) => {
    game[`row_${y}`][`col_${x}`] = 2;
  });
  piece.active = false;
}

function isOutOfBand(x, y) {
  return x < 0 || x > GAME_SIZE.x || y > GAME_SIZE.y
}