'use strict';

let p5nyan;

p5.prototype.start = (x = 100, y = 200, margin = false) => {
  // キャンバスの設定
  createCanvas(480, 360);
  document.querySelector('canvas').style.border = 'solid 1px gray';
  if (margin) {
    document.querySelector('canvas').style.margin = '50px';
  }
  // document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 描画の装飾
  background(255);
  noStroke();

  // その他の設定
  frameRate(30);
  textAlign(CENTER, CENTER);
  colorMode(HSL, 360, 100, 100);

  // スプライトの生成
  p5nyan = new Sprite(x, y);
};

class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = 'coral';
    this.ncol = this.getNCol();
    this.size = 60;
    this.state = false;
    this.draw();
  }

  draw(keepState = false) {
    background(255);
    noStroke();

    this.state = keepState ? this.state : !this.state;
    const x = this.x;
    const y = this.y;
    const h = this.state ? 25 : 23;

    if (this.dir.x) {
      const dx = this.dir.x;
      // ear
      fill(this.ncol);
      triangle(x + 8 * dx, y - h + 2, x + 24 * dx, y - h + 10, x + 20 * dx, y - h - 6);
      // head
      fill(this.col);
      ellipse(x, y, 60, h * 2);
      // eyes
      fill(0);
      circle(x, y - 3, 6);
      circle(x + 20 * dx, y - 3, 6);
      // ear
      fill(this.ncol);
      triangle(x, y - h + 4, x - 22 * dx, y - h + 10, x - 12 * dx, y - h - 10);
      // nose
      triangle(x + 10 * dx, y + 3, x + 18 * dx, y + 3, x + 14 * dx, y + 6);
      // whiskers
      stroke(this.ncol);
      line(x - 14 * dx, y + 3, x - 20 * dx, y + 3);
      line(x - 14 * dx, y, x - 20 * dx, y);
    } else {
      const dy = this.dir.y;
      // head
      fill(this.col);
      ellipse(x, y, 60, h * 2);
      // eyes
      fill(0);
      circle(x - 12, y + 8 * dy, 6);
      circle(x + 12, y + 8 * dy, 6);
      // ears
      fill(this.ncol);
      triangle(x - 6, y - (h - 12) * dy, x - 26, y - (h - 16) * dy, x - 18, y - (h + 4) * dy);
      triangle(x + 6, y - (h - 12) * dy, x + 26, y - (h - 16) * dy, x + 18, y - (h + 4) * dy);
      // nose
      triangle(x + 4, y + 13 * dy, x - 4, y + 13 * dy, x, y + 16 * dy);
      // whiskers
      stroke(this.ncol);
      line(x - 22, y + 10 * dy, x - 28, y + 10 * dy);
      line(x - 22, y + 13 * dy, x - 28, y + 13 * dy);
      line(x + 22, y + 10 * dy, x + 28, y + 10 * dy);
      line(x + 22, y + 13 * dy, x + 28, y + 13 * dy);
    }
  }

  walk(steps = 10) {
    this.x += this.dir.x * steps;
    this.y += this.dir.y * steps;
    this.draw();
  }

  turn(dir) {
    switch (dir) {
      case 'N':
      case '上':
        this.dir.x = 0;
        this.dir.y = -1;
        break;
      case 'S':
      case '下':
        this.dir.x = 0;
        this.dir.y = 1;
        break;
      case 'E':
      case '右':
        this.dir.x = 1;
        this.dir.y = 0;
        break;
      case 'W':
      case '左':
        this.dir.x = -1;
        this.dir.y = 0;
        break;
      default:
        console.error('方向はN/S/E/Wもしくは上/下/左/右で指定してください');
        noLoop();
        break;
    }

    this.draw(true);
  }

  turnBack() {
    if (this.dir.x) {
      this.dir.x *= -1;
    } else {
      this.dir.y *= -1;
    }
    this.draw(true);
  }

  say(msg) {
    this.draw(true);
    fill(0);
    noStroke();
    text(msg, this.x, this.y - 50);
  }

  setColor(col = 'orange') {
    this.col = col;
    this.ncol = this.getNCol();
    this.draw(true);
  }

  getNCol() {
    return color(hue(this.col), saturation(this.col), lightness(this.col) * 0.5);
  }

  getColor() {
    return this.col;
  }

  setDir(next, prev) {
    if (this.dir.x) {
      this.dir.x = next >= prev ? 1 : -1;
    } else {
      this.dir.y = next >= prev ? 1 : -1;
    }
  }

  setXY(x, y) {
    const keepState = this.x == x && this.y == y;
    if (this.dir.x) {
      this.setDir(x, this.x);
    }
    this.x = x;
    if (this.dir.y) {
      this.setDir(y, this.y);
    }
    this.y = y;
    this.draw(keepState);
  }

  setX(x) {
    const keepState = this.x == x;
    this.setDir(x, this.x);
    this.x = x;
    this.draw(keepState);
  }

  setY(y) {
    const keepState = this.y == y;
    this.setDir(y, this.y);
    this.y = y;
    this.draw(keepState);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getXY() {
    return [this.x, this.y];
  }
}

/* メソッドを直接呼び出せるように */

p5.prototype.sleep = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

p5.prototype.walk = (steps) => {
  p5nyan.walk(steps);
};

p5.prototype.say = (msg) => {
  p5nyan.say(msg);
};

p5.prototype.turn = (dir) => {
  p5nyan.turn(dir);
};

p5.prototype.turnBack = () => {
  p5nyan.turnBack();
};

p5.prototype.setColor = (col) => {
  p5nyan.setColor(col);
};

p5.prototype.getColor = () => {
  return p5nyan.getColor();
};

p5.prototype.setXY = (x, y) => {
  p5nyan.setXY(x, y);
};

p5.prototype.moveToXY = (x, y) => {
  p5nyan.setXY(x, y);
};

p5.prototype.setX = (x) => {
  p5nyan.setX(x);
};

p5.prototype.moveToX = (x) => {
  p5nyan.setX(x);
};

p5.prototype.setY = (y) => {
  p5nyan.setY(y);
};

p5.prototype.moveToY = (y) => {
  p5nyan.setY(y);
};

p5.prototype.getX = () => {
  return p5nyan.getX();
};

p5.prototype.getY = () => {
  return p5nyan.getY();
};

p5.prototype.getPos = () => {
  return p5nyan.getPos();
};
