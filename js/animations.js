export function animateDeletedLine(indexLines, gameSizeX) {
  for (const indexLine of indexLines) {
    for (let i = 0; i < gameSizeX; i++) {
      const htmlsquare = document.querySelector(`.row_${indexLine}.col_${i}`);
      htmlsquare.classList.add('delete');
    }
  }
  return sleep(800);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
