import { buildGame } from './js/init';
import { calculateFps, shuffle } from './js/utils';
import { inputs, pauseInput, turnInput, resetInput } from './js/keyEvent';
import { Tetra } from './tetraminos/Tetra';
import { namesShape, tetraShape } from './tetraminos/tetraShape';
import { animateDeletedLine } from './js/animations';
import { buildFirstMenu, buildPause } from './js/menu';

const SQUARE_STATES = ['empty', 'piece', 'freezePiece', 'delete'];
const GAME_SIZE = { x: 10, y: 20 };
const NEXT_LEVEL_LINE_LIMIT = 10;
const speedLimit = 5;
let currentFrame = null;
let currentPiece = null;
let game = null;
let nextPiece = null;
let gameState = null;
const toFreezePiece = {
  state: false,
  time: 0
};

function launchNewGame() {
  currentFrame = 0;
  game = buildGame(GAME_SIZE);
  nextPiece = shuffle(tetraShape);
  currentPiece = null;
  gameState = {
    speed: 40,
    level: 0,
    score: 0,
    time: 0,
    totalLine: 0,
    nextLevelLine: 10,
  };
  resetInput();
  window.requestAnimationFrame(gameLoop);
}

buildFirstMenu(launchNewGame);
async function gameLoop(timeStamp) {
  if (!currentPiece || !currentPiece.active) {
    currentPiece = addPiece();
  }
  gameState.time++;
  currentFrame++;
  printLevel(gameState.level, gameState.time, gameState.score);
  printGame(game);
  printPiece(currentPiece.position, currentPiece.name);
  printPreview(nextPiece.name);

  turnInput.state = turnPiece(currentPiece, turnInput.state);

  console.log(calculateFps(timeStamp));

  if (currentFrame % speedLimit === 0) {
    movePiece(currentPiece, inputs, currentFrame);
  }

  if (currentFrame % gameState.speed === 0) {
    movePieceDown(currentPiece, currentFrame);
  }

  if (!canIMove(currentPiece, 0, 1) && toFreezePiece.state && (currentFrame - toFreezePiece.time + 1) % gameState.speed === 0) {
    const result = freezePiece(game, currentPiece);
    if (result === 'GAME_OVER') {
      buildFirstMenu(launchNewGame, gameState);
      return console.log('GAME_OVER');
    }
    game = await removeLine(game, gameState);
  }
  if (pauseInput.state) {
    pauseInput.state = null;
    const resultPause = await buildPause();
    if (resultPause === 'restart') {
      launchNewGame();
      return;
    }
  }
  window.requestAnimationFrame(gameLoop);
}

function addPiece() {
  const newPiece = new Tetra(nextPiece.name, nextPiece.shapes);
  nextPiece = getNewPiece(nextPiece);
  return newPiece;
}

function getNewPiece(oldPiece) {
  let newPiece = shuffle(tetraShape);
  if (newPiece.name === oldPiece.name) {
    newPiece = getNewPiece(oldPiece);
  }
  return newPiece;
}

function printGame(game) {
  for (let i = 0; i < game.length; i++) {
    const row = game[i];
    for (let j = 0; j < row.length; j++) {
      const colValue = row[j];
      const htmlSquare = document.querySelector(`.row_${i}.col_${j}`);
      htmlSquare.classList.remove(...SQUARE_STATES);
      htmlSquare.classList.remove(...namesShape);
      htmlSquare.classList.add(...colValue.split(','));
    }
  }
}

function printPiece(position, name) {
  position.forEach(({ x, y }) => {
    if (y >= 0) {
      const htmlSquare = document.querySelector(`.row_${y}.col_${x}`);
      htmlSquare.classList.remove(...SQUARE_STATES);
      htmlSquare.classList.add(SQUARE_STATES[1]);
      nameHTMLPiece(htmlSquare, name);
    }
  });
}

function printPreview(name) {
  const htmlPreview = document.getElementById('preview');
  htmlPreview.className = name;
}

function printLevel(level, time, score) {
  const htmlLevel = document.getElementById('level');
  htmlLevel.innerHTML = `<p>Level ${level}</p><p>TIME: </br>${Math.round(time / 60)}s</p><p>SCORE: </br>${score}</p>`;
}

function nameHTMLPiece(piece, name) {
  piece.classList.remove(...namesShape);
  piece.classList.add(name);
}

function movePiece(piece, inputs, currentFrame) {
  if (inputs.includes('LEFT')) {
    if (canIMove(piece, -1)) piece.left();
  }
  if (inputs.includes('RIGHT')) {
    if (canIMove(piece, 1)) piece.right();
  }

  if (inputs.includes('DOWN')) {
    movePieceDown(currentPiece, currentFrame);
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

function movePieceDown(piece, time) {
  if (canIMove(piece, 0, 1)) {
    piece.down();
    toFreezePiece.state = false;
  } else if (!toFreezePiece.state) {
    toFreezePiece.state = true;
    toFreezePiece.time = time;
  }
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
        if (gp !== 'empty') {
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
    else game[y][x] = `freezePiece,${piece.name}`;
  }
  piece.freeze();
  toFreezePiece.state = false;
  return gameState;
}

function isOutOfBand(x, y) {
  return x < 0 || x > GAME_SIZE.x || y > GAME_SIZE.y - 1;
}

async function removeLine(game) {
  const indexDeletedLine = [];
  game = game.filter((row, index) => {
    if (row.every(c => c.includes('freezePiece'))) indexDeletedLine.push(index);
    return !row.every(c => c.includes('freezePiece'));
  });
  const totalDeletedLines = indexDeletedLine.length;
  for (let i = 0; i < totalDeletedLines; i++) {
    const newEmptyLine = [];
    for (let j = 0; j < GAME_SIZE.x; j++) {
      newEmptyLine[j] = 'empty';
    }
    game.unshift(newEmptyLine);
  }
  if (totalDeletedLines) {
    await animateDeletedLine(indexDeletedLine, GAME_SIZE.x);
    gameState.score += totalDeletedLines * 100 * 2 ** totalDeletedLines;
    gameState.totalLine += totalDeletedLines;
    if (gameState.totalLine > gameState.nextLevelLine) await nextLevel(game);
  }
  return game;
}

async function nextLevel(game) {
  gameState.level++;
  gameState.nextLevelLine += NEXT_LEVEL_LINE_LIMIT;
  if (game.speed > speedLimit) {
    gameState.speed -= 5;
  }
}
