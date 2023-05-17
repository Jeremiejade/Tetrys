import { buildGame } from './js/init';
import { calculateFps, shuffle } from './js/utils';
import { inputs, turnInput } from './js/keyEvent';
import { Tetra } from './tetraminos/Tetra';
import { tetraShape } from './tetraminos/tetraShape';
import { animateDeletedLine } from './js/animations';

const SQUARE_STATES = ['empty', 'piece', 'freezePiece', 'delete'];
const GAME_SIZE = { x: 10, y: 18 };
let currentFrame = 0;
const speed = 40;
const speedLimit = 5;
let currentPiece = null;

let game = buildGame(GAME_SIZE);
let nextPiece = shuffle(tetraShape);

window.requestAnimationFrame(gameLoop);
async function gameLoop(timeStamp) {
  if (!currentPiece || !currentPiece.active) {
    currentPiece = addPiece();
  }
  currentFrame++;
  printGame(game);
  printPiece(currentPiece.position);
  printPreview(nextPiece.name);

  turnInput.state = turnPiece(currentPiece, turnInput.state);

  // console.log(calculateFps(timeStamp));
  if (currentFrame % speedLimit === 0) {
    movePiece(currentPiece, inputs);
  }

  if (currentFrame % speed === 0) {
    const result = movePieceDown(currentPiece, game);
    if (result === 'GAME_OVER') return console.log('GAME_OVER');
    game = await removeLine(game);
  }
  window.requestAnimationFrame(gameLoop);
}

function addPiece() {
  const newPiece = new Tetra(nextPiece.name, nextPiece.shapes);
  nextPiece = shuffle(tetraShape);
  return newPiece;
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

function printPreview(name) {
  const htmlPreview = document.getElementById('preview');
  htmlPreview.className = name;
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

function turnPiece(piece, input) {
  if (input === 'TURN_LEFT') {
    if (canITurn(piece, 'LEFT')) {
      piece.rotateToLeft();
    }
  }

  if (input === 'TURN_RIGHT') {
    if (canITurn(piece, 'RIGHT')) {
      piece.rotateToRight();
    }
  }
  return null;
}

function movePieceDown(piece, game) {
  if (canIMove(piece, 0, 1)) piece.down();
  else return freezePiece(game, piece);
}
function canIMove(piece, dx, dy = 0) {
  const position = piece.position.map(({ x, y }) => ({ x: x + dx, y: y + dy }));
  return canIDo(position);
}

function canITurn(piece, direction) {
  let position = null;
  if (direction === 'LEFT') {
    position = piece.previousShapePosition;
  } else {
    position = piece.nextShapePosition;
  }
  return canIDo(position);
}

function canIDo(position) {
  let canMove = true;
  position.forEach(({ x, y }) => {
    if (y >= 0) {
      if (isOutOfBand(x, y)) {
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
  let gameState = 'ok';
  for (const { x, y } of piece.position) {
    if (y < 0) gameState = 'GAME_OVER';
    else game[y][x] = 2;
  }
  piece.freeze();
  return gameState;
}

function isOutOfBand(x, y) {
  return x < 0 || x > GAME_SIZE.x || y > GAME_SIZE.y - 1;
}

async function removeLine(game) {
  const indexDeletedLine = [];
  game = game.filter((row, index) => {
    if (row.every(c => c === 2)) indexDeletedLine.push(index);
    return !row.every(c => c === 2);
  });
  const totalDeletedLines = indexDeletedLine.length;
  for (let i = 0; i < totalDeletedLines; i++) {
    const newEmptyLine = [];
    for (let j = 0; j < GAME_SIZE.x; j++) {
      newEmptyLine[j] = 0;
    }
    game.unshift(newEmptyLine);
  }
  if (totalDeletedLines) {
    await animateDeletedLine(indexDeletedLine, GAME_SIZE.x);
  }
  return game;
}
