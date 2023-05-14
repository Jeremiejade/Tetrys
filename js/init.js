const htmlGrid = document.getElementById('grid');
export function buildGame({x, y}) {
  const game = {};
  for (let i = 1; i <= y; i++) {
    game[`row_${i}`] = {};
    for (let j = 1; j <= x; j++) {
      game[`row_${i}`][`col_${j}`] = 0;
      buildSquare(`col_${j}`, `row_${i}`);
    }
  }
  return game;
}

function buildSquare(colClass, rowClass) {
  const square = document.createElement('div');
  square.classList.add(colClass, rowClass, 'square');
  htmlGrid.appendChild(square);
}
