export const Square = class {
  constructor() {
    this.active = true;
    this.y = -1;
    this.x = 4;
    this.shape = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
  }

  get position() {
    return this.shape.map(s => ({ x: this.x + s.x, y: this.y + s.y }));
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
