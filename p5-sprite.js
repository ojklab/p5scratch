"use strict";

let p5nyan;

p5.prototype.start = (x = width / 2, y = height / 2, margin_y = 0, margin_x = 0) => {
  if (p5nyan) return;

  // キャンバスの設定
  document.querySelector("canvas").style.border = "solid 1px gray";
  if (margin_x) {
    document.querySelector("canvas").style.marginTop = margin_x + "px";
  }
  if (margin_y) {
    document.querySelector("canvas").style.marginTop = margin_y + "px";
  }
  // document.addEventListener('contextmenu', (e) => e.preventDefault());

  // 描画の装飾
  background(255);
  noStroke();

  // その他の設定
  frameRate(30);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  strokeCap(ROUND);

  // スプライトの生成
  p5nyan = new Sprite(x, y);

  // ループを止める
  noLoop();
};

/** スプライト（ピゴニャン） */
class Sprite {
  static flushScreen = true;
  static withBody = true;
  static withElbow = false;

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = "coral";
    this.dcol = this.getDarkColor(this.col);
    this.pcol = this.getPaleColor(this.col);
    this.state = false;
    this.keepH = false;
    this.fishList = [];
    this.draw();
  }

  /** 描画（ピゴニャンと魚） */
  draw(keepState = false, saying = false) {
    if (Sprite.flushScreen) background(255);

    // 魚関係
    this.eatFish();
    this.drawFish();

    // 歩き状態を更新
    this.state = keepState ? this.state : !this.state;

    // stroke("black");
    // circle(this.x, this.y + 10, 70);

    // 左右向き
    if (this.dir.x) {
      if (Sprite.withBody) {
        this.drawBodyH(this.x, this.y, this.dir.x);
      }
      this.drawHeadH(this.x, this.y, this.dir.x, saying);
    }
    // 上下向き
    else {
      if (Sprite.withBody) {
        this.drawBodyV(this.x, this.y, this.dir.y);
        this.drawHeadV(this.x, this.y, this.dir.y, saying);
      } else {
        this.drawHeadV(this.x, this.y, this.dir.y, saying);
      }
    }

    // 色設定を初期化（stroke(0) やstroke("black") だと何故か無効になる）
    strokeWeight(1);
    stroke(0);
    fill(255);
  }

  /** 左右向きの胴体 */
  drawBodyH(x, y, d) {
    // tail
    strokeWeight(2.5);
    stroke(this.dcol);
    let p = { x: x - 15 * d, y: y + 35 };
    line(p.x + 9 * d, p.y - 4, p.x, p.y);
    line(p.x, p.y, p.x - 4 * d, p.y - 2);

    // 手前脚が前
    if (this.state) {
      // back arm
      stroke(this.pcol);
      strokeWeight(4.5);
      line(x + 12 * d, y + 24.5, x + 17 * d, y + 27.5);
      // back leg
      strokeWeight(5.5);
      p = { x: x - 7 * d, y: y + 39.5 };
      line(p.x + 8 * d, p.y - 9, p.x, p.y);
      line(p.x, p.y, p.x + 6 * d, p.y);
      // front arm
      stroke(this.col);
      strokeWeight(5);
      line(x - 8.5 * d, y + 23.5, x - 16 * d, y + 27.5);
      // front leg
      strokeWeight(6);
      p = { x: x + 10 * d, y: y + 38 };
      line(p.x - 14 * d, p.y - 8, p.x, p.y);
      line(p.x, p.y, p.x + 4 * d, p.y - 2);
    }
    // 手前脚が後
    else {
      // back arm
      stroke(this.pcol);
      strokeWeight(4.5);
      line(x - 7 * d, y + 24, x - 12 * d, y + 27.5);
      // back leg
      strokeWeight(5.5);
      p = { x: x + 10 * d, y: y + 38 };
      line(p.x - 6 * d, p.y - 7, p.x, p.y);
      line(p.x, p.y, p.x + 4 * d, p.y - 2);
      // front leg
      stroke(this.col);
      strokeWeight(6);
      p = { x: x - 8 * d, y: y + 39 };
      line(p.x + 4 * d, p.y - 8, p.x, p.y);
      line(p.x, p.y, p.x + 6 * d, p.y);
    }
    // body
    noStroke();
    fill(this.col);
    square(x + 2 * d, y + 22, 22, 5);
    // 手前脚が前
    if (this.state) {
      // bell
      fill(this.dcol);
      ellipse(x + 4 * d, y + 20, 18, 6);
      noStroke();
      fill("gold");
      circle(x + 10 * d, y + 23, 5);
    }
    // 手前脚が後
    else {
      // bell
      fill(this.dcol);
      ellipse(x + 6 * d, y + 20, 14, 5);
      noStroke();
      fill("gold");
      circle(x + 12 * d, y + 23, 5);
      // front arm
      strokeWeight(5);
      stroke(this.col);
      line(x, y + 23.5, x + 16 * d, y + 27.5);
    }
  }

  /** 左右向きの頭部 */
  drawHeadH(x, y, d, saying) {
    // ear
    noStroke();
    fill(this.dcol);
    triangle(x + 8 * d, y - 20, x + 24 * d, y - 12, x + 20 * d, y - 28);
    // head
    fill(this.col);
    ellipse(x, y, 60, 44);
    // eyes
    fill(0);
    circle(x, y, 6);
    circle(x + 22 * d, y, 5.75);
    // ear
    fill(this.dcol);
    triangle(x, y - 18, x - 22 * d, y - 12, x - 12 * d, y - 32);
    // nose
    triangle(x + 12 * d, y + 6, x + 20 * d, y + 6, x + 16 * d, y + 9);
    // whiskers
    strokeWeight(1);
    stroke(this.dcol);
    line(x - 12 * d, y + 6, x - 18 * d, y + 6);
    line(x - 12 * d, y + 3, x - 18 * d, y + 3);
    line(x + 31 * d, y + 6, x + 29 * d, y + 6);
    line(x + 31 * d, y + 3, x + 30 * d, y + 3);
    // mouth
    if (saying) {
      fill("crimson");
      noStroke();
      ellipse(x + 14 * d, y + 14, 4, 5);
    }
  }

  /** 上下向きの胴体 */
  drawBodyV(x, y, dy) {
    let p = { x: x, y: y };
    let dx = this.state ? 1 : -1;

    // 下向き
    if (dy > 0) {
      // front leg
      stroke(this.col);
      strokeWeight(6);
      p = { x: x - 8 * dx, y: y + 39 };
      line(p.x + 2 * dx, p.y - 8, p.x, p.y);
      line(p.x, p.y, p.x - 4 * dx, p.y - 2);
      // back leg
      stroke(this.pcol);
      strokeWeight(5.5);
      p = { x: x + 12 * dx, y: y + 36 };
      line(x + 6 * dx, y + 33, x + 10 * dx, y + 36);
      // front arm
      strokeWeight(5);
      stroke(this.col);
      line(x + 6 * dx, y + 20, x + 17 * dx, y + 28.5);
      // back arm
      strokeWeight(4.5);
      stroke(this.pcol);
      line(x - 4 * dx, y + 18, x - 14 * dx, y + 26);
      // body
      noStroke();
      fill(this.col);
      square(x, y + 22, 22, 5);
      // bell
      fill(this.dcol);
      ellipse(x, y + 20, 20, 7);
      noStroke();
      fill("gold");
      circle(x, y + 23, 5);
    }
    // 上向き
    else {
      // front leg
      stroke(this.col);
      strokeWeight(6);
      p = { x: x - 6 * dx, y: y + 39 };
      line(p.x, p.y - 8, p.x, p.y);
      line(p.x, p.y, p.x - 3 * dx, p.y - 2);
      // back leg
      stroke(this.pcol);
      strokeWeight(5.5);
      p = { x: x + 6 * dx, y: y + 35 };
      line(p.x, p.y - 6, p.x, p.y);
      line(p.x, p.y, p.x + 3 * dx, p.y - 2);
      // front arm
      strokeWeight(5);
      stroke(this.col);
      line(x + 6 * dx, y + 20, x + 17 * dx, y + 28.5);
      // back arm
      strokeWeight(4.5);
      stroke(this.pcol);
      line(x - 4 * dx, y + 18, x - 14 * dx, y + 26);
      // body
      noStroke();
      fill(this.col);
      square(x, y + 22, 22, 5);
      // belt
      fill(this.dcol);
      ellipse(x, y + 20, 20, 7);
      // tail
      strokeWeight(2.5);
      stroke(this.dcol);
      const d = this.state ? 1 : -1;
      p = { x: x, y: y + 38 };
      line(p.x, p.y - 7, p.x, p.y);
      line(p.x, p.y, p.x + 4 * d, p.y + 3);
    }
  }

  /** 上下向きの頭部 */
  drawHeadV(x, y, d, saying) {
    // head
    noStroke();
    fill(this.col);
    ellipse(x, y, 60, 44);
    if (Sprite.withBody) {
      if (d < 0) {
        // ears
        fill(this.dcol);
        triangle(x - 6, y - 14, x - 26, y - 7, x - 22, y - 28);
        triangle(x + 6, y - 14, x + 26, y - 7, x + 22, y - 28);
      } else {
        // eyes
        fill(0);
        circle(x - 12, y, 6);
        circle(x + 12, y, 6);
        // ears
        fill(this.dcol);
        triangle(x - 6, y - 18, x - 26, y - 11, x - 22, y - 30);
        triangle(x + 6, y - 18, x + 26, y - 11, x + 22, y - 30);
        // nose
        triangle(x + 4, y + 6, x - 4, y + 6, x, y + 9);
        // whiskers
        strokeWeight(1);
        stroke(this.dcol);
        line(x - 24, y + 6, x - 30, y + 6);
        line(x - 24, y + 3, x - 30, y + 3);
        line(x + 24, y + 6, x + 30, y + 6);
        line(x + 24, y + 3, x + 30, y + 3);
        // mouth
        if (saying) {
          fill("crimson");
          noStroke();
          ellipse(x, y + 15, 4, 5);
        }
      }
    } else {
      // eyes
      fill(0);
      circle(x - 12, y + 6 * d, 6);
      circle(x + 12, y + 6 * d, 6);
      // ears
      fill(this.dcol);
      triangle(x - 6, y - 10 * d, x - 26, y - 6 * d, x - 18, y - 26 * d);
      triangle(x + 6, y - 10 * d, x + 26, y - 6 * d, x + 18, y - 26 * d);
      // nose
      triangle(x + 4, y + 13 * d, x - 4, y + 13 * d, x, y + 16 * d);
      // whiskers
      strokeWeight(1);
      stroke(this.dcol);
      line(x - 22, y + 10 * d, x - 28, y + 10 * d);
      line(x - 22, y + 13 * d, x - 28, y + 13 * d);
      line(x + 22, y + 10 * d, x + 28, y + 10 * d);
      line(x + 22, y + 13 * d, x + 28, y + 13 * d);
      // mouth
      if (saying) {
        fill("crimson");
        noStroke();
        ellipse(x, y + 20 * d, 4, 4);
      }
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

    if (Sprite.flushScreen) {
      this.draw(true);
    }
  }

  /** 方向転換 */
  turnBack() {
    if (this.dir.x) {
      this.dir.x *= -1;
    } else {
      this.dir.y *= -1;
    }
    if (Sprite.flushScreen) {
      this.draw(true);
    }
  }

  /** しゃべる */
  say(msg) {
    if (!msg) return;
    this.draw(true, true);
    fill(0);
    noStroke();
    if (this.dir.x) {
      text(msg, this.x + 2 * this.dir.x, this.y - 42);
    } else {
      text(msg, this.x, this.y - 42);
    }
    stroke(0);
    fill(255);
  }

  /** 色を変更 */
  setColor(col = "coral") {
    this.col = col;
    this.dcol = this.getDarkColor(col);
    this.pcol = this.getPaleColor(col);
    this.draw(true);
  }

  /** ツール（耳・鼻・しっぽの色） */
  getDarkColor(col, s = 0.5) {
    colorMode(HSL, 360, 100, 100);
    const dcol = color(hue(col), saturation(col), lightness(col) * s);
    colorMode(RGB);
    return dcol;
  }

  /** ツール（後ろの手足の色） */
  getPaleColor(col, s = 0.75) {
    colorMode(HSL, 360, 100, 100);
    const pcol = color(hue(col), saturation(col) * s, lightness(col) * 0.9);
    colorMode(RGB);
    return pcol;
  }

  getColor() {
    return this.col;
  }

  /** 座標で指定 */
  setXY(x, y) {
    if (!isFinite(x) || !isFinite(y)) return;
    const keepState = this.x == x && this.y == y;

    if (this.keepH || abs(this.x - x) >= abs(this.y - y)) {
      this.dir.x = x >= this.x ? 1 : -1;
      this.dir.y = 0;
    } else {
      this.dir.y = y >= this.y ? 1 : -1;
      this.dir.x = 0;
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
      this.dir.y = 0;
    }
    this.dir.x = x >= this.x ? 1 : -1;
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
    }
    this.dir.y = y >= this.y ? 1 : -1;
    this.y = y;
    this.draw(keepState);
  }

  getY() {
    return this.y;
  }

  keepHorizontal(flag) {
    this.keepH = flag;
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

  fish(x, y, col) {
    fill(col);
    noStroke();
    ellipse(x, y, 30, 15);
    const tailCol = this.getDarkColor(col);
    fill(tailCol);
    circle(x - 5, y - 1, 4);
    triangle(x + 15, y, x + 22, y + 7, x + 22, y - 7);
    fill(255);
    stroke(0);
  }

  moveFish(step = 10) {
    if (!this.fishList) return;
    for (let i = 0; i < this.fishList.length; i += 1) {
      this.fishList[i].x -= step;
      if (this.fishList[i].x < -11) this.fishList[i].x = 495;
    }
    this.draw(true);
  }

  eatFish() {
    if (!this.fishList) return;
    this.fishList = this.fishList.filter((fish) => {
      const fx = fish.x;
      const fy = fish.y;
      if (Sprite.withBody) {
        if (fx < this.x + 45 && fx > this.x - 52 && fy < this.y + 48 && fy > this.y - 27) {
          return false;
        }
      } else {
        if (fx < this.x + 45 && fx > this.x - 52 && fy < this.y + 33 && fy > this.y - 33) {
          return false;
        }
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

p5.prototype.keepHorizontal = (flag = true) => {
  return p5nyan.keepHorizontal(flag);
};

p5.prototype.putFish = (x, y, col) => {
  return p5nyan.putFish(x, y, col);
};

p5.prototype.moveFish = (step) => {
  return p5nyan.moveFish(step);
};
