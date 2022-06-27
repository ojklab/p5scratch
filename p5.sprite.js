'use strict';

let ojkSprite;

p5.prototype.start = (x = 100, y = 200, margin = false) => {
  // キャンバスの設定
  createCanvas(400, 400);
  document.querySelector('canvas').style.border = 'solid 1px gray';
  if (margin) {
    document.querySelector('canvas').style.margin = '50px';
  }
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 描画の装飾
  background(255);
  noStroke();

  // その他の設定
  frameRate(30);
  textAlign(CENTER, CENTER);

  // スプライトの生成
  ojkSprite = new Sprite(x, y);
};

class Sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = 'coral';
    this.state = false;
    this.draw();
  }

  draw(keepState = false) {
    background(255);
    noStroke();
    fill(this.col);

    this.state = keepState ? this.state : !this.state;

    if (this.state) {
      circle(this.x, this.y, 50);
    } else {
      ellipse(this.x, this.y, 50, 45);
    }

    fill(0);
    if (this.dir.x) {
      circle(this.x, this.y - 3, 5);
      circle(this.x + 15 * this.dir.x, this.y - 3, 5);
    } else {
      circle(this.x - 8, this.y + 10 * this.dir.y, 5);
      circle(this.x + 8, this.y + 10 * this.dir.y, 5);
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

    this.draw();
  }

  say(msg) {
    this.draw(true);
    text(msg, this.x, this.y - 40);
  }

  setColor(col = 'coral') {
    this.col = col;
    this.draw(true);
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
  ojkSprite.walk(steps);
};

p5.prototype.say = (msg) => {
  ojkSprite.say(msg);
};

p5.prototype.turn = (dir) => {
  ojkSprite.turn(dir);
};

p5.prototype.setColor = (col) => {
  ojkSprite.setColor(col);
};

p5.prototype.getColor = () => {
  return ojkSprite.getColor();
};

p5.prototype.setXY = (x, y) => {
  ojkSprite.setXY(x, y);
};

p5.prototype.moveToXY = (x, y) => {
  ojkSprite.setXY(x, y);
};

p5.prototype.setX = (x) => {
  ojkSprite.setX(x);
};

p5.prototype.moveToX = (x) => {
  ojkSprite.setX(x);
};

p5.prototype.setY = (y) => {
  ojkSprite.setY(y);
};

p5.prototype.moveToY = (y) => {
  ojkSprite.setY(y);
};

p5.prototype.getX = () => {
  return ojkSprite.getX();
};

p5.prototype.getY = () => {
  return ojkSprite.getY();
};

p5.prototype.getPos = () => {
  return ojkSprite.getPos();
};
