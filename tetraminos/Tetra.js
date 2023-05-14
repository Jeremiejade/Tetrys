export const Tetra = class {
  constructor(shape) {
    this.active = true;
    this.y = 0;
    this.x = 4;
    this.shape = shape;
    this.currentIndexShape = 0
  }

  get position() {
    return this.currentShape.map(s => ({ x: this.x + s.x, y: this.y + s.y }));
  }

  get currentShape() {
    return this.shape[this.currentIndexShape]
  }

  left() {
    this.x--;
  }

  right() {
    this.x++;
  }

  down() {
    this.y++;
  }

  freeze() {
    this.active = false;
  }
};
