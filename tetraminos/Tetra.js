export const Tetra = class {
  constructor(name, shape) {
    this.active = true;
    this.y = 2;
    this.x = 4;
    this.name = name;
    this.shape = shape;
    this.currentIndexShape = 0;
  }

  get position() {
    return this.currentShape.map(s => ({ x: this.x + s.x, y: this.y + s.y }));
  }

  get currentShape() {
    return this.shape[this.currentIndexShape];
  }

  get nextShapePosition() {
    return this.shape[this.nextIndexShape()]
      .map(s => ({ x: this.x + s.x, y: this.y + s.y }));
  }

  get previousShapePosition() {
    return this.shape[this.previousIndexShape()]
      .map(s => ({ x: this.x + s.x, y: this.y + s.y }));
  }

  rotateToRight() {
    this.currentIndexShape = this.nextIndexShape();
  }

  rotateToLeft() {
    this.currentIndexShape = this.previousIndexShape();
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

  nextIndexShape() {
    if (this.currentIndexShape === this.shape.length - 1) {
      return 0;
    } else {
      return this.currentIndexShape + 1;
    }
  }

  previousIndexShape() {
    if (this.currentIndexShape === 0) {
      return this.shape.length - 1;
    } else {
      return this.currentIndexShape - 1;
    }
  }

  freeze() {
    this.active = false;
  }
};
