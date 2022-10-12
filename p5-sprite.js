"use strict";

let p5nyan;

p5.prototype.start = (x = 100, y = 200, margin = false) => {
  if (p5nyan) return;

  // キャンバスの設定
  createCanvas(480, 360);
  document.querySelector("canvas").style.border = "solid 1px gray";
  if (margin) {
    document.querySelector("canvas").style.margin = "50px";
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
  static flushScreen = true;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = "coral";
    this.dcol = this.getDarkCol(this.col);
    this.state = false;
    this.fishList = [];
    this.draw();
  }

  draw(keepState = false) {
    if (Sprite.flushScreen) background(255);
    noStroke();

    this.eatFish();
    this.drawFish();

    this.state = keepState ? this.state : !this.state;
    const x = this.x;
    const y = this.y;
    const h = this.state ? 25 : 23;

    if (this.dir.x) {
      const dx = this.dir.x;
      // ear
      fill(this.dcol);
      triangle(x + 8 * dx, y - h + 2, x + 24 * dx, y - h + 10, x + 20 * dx, y - h - 6);
      // head
      fill(this.col);
      ellipse(x, y, 60, h * 2);
      // eyes
      fill(0);
      circle(x, y - 3, 6);
      circle(x + 20 * dx, y - 3, 6);
      // ear
      fill(this.dcol);
      triangle(x, y - h + 4, x - 22 * dx, y - h + 10, x - 12 * dx, y - h - 10);
      // nose
      triangle(x + 12 * dx, y + 4, x + 20 * dx, y + 4, x + 16 * dx, y + 7);
      // whiskers
      stroke(this.dcol);
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
      fill(this.dcol);
      triangle(x - 6, y - (h - 12) * dy, x - 26, y - (h - 16) * dy, x - 18, y - (h + 4) * dy);
      triangle(x + 6, y - (h - 12) * dy, x + 26, y - (h - 16) * dy, x + 18, y - (h + 4) * dy);
      // nose
      triangle(x + 4, y + 13 * dy, x - 4, y + 13 * dy, x, y + 16 * dy);
      // whiskers
      stroke(this.dcol);
      line(x - 22, y + 10 * dy, x - 28, y + 10 * dy);
      line(x - 22, y + 13 * dy, x - 28, y + 13 * dy);
      line(x + 22, y + 10 * dy, x + 28, y + 10 * dy);
      line(x + 22, y + 13 * dy, x + 28, y + 13 * dy);
    }
  }

  walk(steps) {
    if (!isFinite(steps)) return;
    this.x += this.dir.x * steps;
    this.y += this.dir.y * steps;
    this.draw();
  }

  turn(dir) {
    switch (dir) {
      case "上":
        this.dir.x = 0;
        this.dir.y = -1;
        break;
      case "下":
        this.dir.x = 0;
        this.dir.y = 1;
        break;
      case "右":
        this.dir.x = 1;
        this.dir.y = 0;
        break;
      case "左":
        this.dir.x = -1;
        this.dir.y = 0;
        break;
      default:
        console.error("方向は上/下/左/右で指定してください");
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
    if (!msg) return;
    this.draw(true);
    fill(0);
    noStroke();
    text(msg, this.x, this.y - 50);
  }

  setColor(col = "coral") {
    this.col = col;
    this.dcol = this.getDarkCol(col);
    this.draw(true);
  }

  getDarkCol(col) {
    return color(hue(col), saturation(col), lightness(col) * 0.5);
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
    if (!isFinite(x) || !isFinite(y)) return;
    const keepState = this.x == x && this.y == y;
    // 直前と同じ方向を向く
    if (this.dir.x) {
      this.setDir(x, this.x);
    } else {
      this.setDir(y, this.y);
    }
    this.x = x;
    this.y = y;
    this.draw(keepState);
  }

  getXY() {
    return [this.x, this.y];
  }

  setX(x) {
    if (!isFinite(x)) return;
    const keepState = this.x == x;
    if (this.dir.y) {
      this.dir.x = true;
      this.dir.y = 0;
    }
    this.setDir(x, this.x);
    this.x = x;
    this.draw(keepState);
  }

  getX() {
    return this.x;
  }

  setY(y) {
    if (!isFinite(y)) return;
    const keepState = this.y == y;
    if (this.dir.x) {
      this.dir.x = 0;
      this.dir.y = true;
    }
    this.setDir(y, this.y);
    this.y = y;
    this.draw(keepState);
  }

  getY() {
    return this.y;
  }

  /* 以下、魚の描画  */

  putFish(x, y, col = "skyblue") {
    if (!isFinite(x) || !isFinite(y)) return;

    this.fishList.push({ x: x, y: y, col: col });
    this.draw(true);
  }

  drawFish() {
    if (!this.fishList) return;
    for (let fish of this.fishList) {
      this.fish(fish.x, fish.y, fish.col);
    }
  }

  moveFish(step = 10) {
    if (!this.fishList) return;
    for (let i = 0; i < this.fishList.length; i += 1) {
      this.fishList[i].x -= step;
      if (this.fishList[i].x < -11) this.fishList[i].x = 495;
    }
    this.draw(true);
  }

  fish(x, y, col) {
    fill(col);
    noStroke();
    ellipse(x, y, 30, 15);
    const tailCol = this.getDarkCol(col);
    fill(tailCol);
    circle(x - 5, y - 1, 4);
    triangle(x + 15, y, x + 22, y + 7, x + 22, y - 7);
  }

  eatFish() {
    if (!this.fishList) return;
    this.fishList = this.fishList.filter((fish) => {
      const x = fish.x;
      const y = fish.y;
      if (x - 15 < this.x + 30 && x + 22 + 7 > this.x - 30 && y - 8 < this.y + 25 && y + 8 > this.y - 25) {
        return false;
      }
      return true;
    });
  }
}

/* メソッドを直接呼び出せるように */

p5.prototype.sleep = (sec) => {
  if (sec < 0) return;
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

p5.prototype.getXY = () => {
  return p5nyan.getXY();
};

p5.prototype.moveToXY = (x, y) => {
  p5nyan.setXY(x, y);
};

p5.prototype.setX = (x) => {
  p5nyan.setX(x);
};

p5.prototype.getX = () => {
  return p5nyan.getX();
};

p5.prototype.moveToX = (x) => {
  p5nyan.setX(x);
};

p5.prototype.setY = (y) => {
  p5nyan.setY(y);
};

p5.prototype.getY = () => {
  return p5nyan.getY();
};

p5.prototype.getXY = () => {
  return p5nyan.getXY();
};

p5.prototype.putFish = (x, y, col) => {
  return p5nyan.putFish(x, y, col);
};

p5.prototype.moveFish = (step) => {
  return p5nyan.moveFish(step);
};
