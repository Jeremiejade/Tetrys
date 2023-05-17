const htmlGrid = document.getElementById('grid');
export function buildGame({ x, y }) {
  const game = [];
  for (let i = 0; i < y; i++) {
    game[i] = [];
    for (let j = 0; j < x; j++) {
      game[i][j] = 0;
      buildSquare(`col_${j}`, `row_${i}`);
    }
  }
  buildPreview();
  return game;
}

function buildSquare(colClass, rowClass) {
  const square = document.createElement('div');
  square.classList.add(colClass, rowClass, 'square');
  htmlGrid.appendChild(square);
}

function buildPreview() {
  const htmlPreview = document.getElementById('preview');
  for (let i = 0; i < 4; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel', `pixel_${i}`);
    htmlPreview.appendChild(pixel);
  }
}
