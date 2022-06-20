'use strict';

let ojkSprite;

p5.prototype.start = (margin = false) => {
  createCanvas(400, 400);
  translate(width / 2, height / 2);

  document.querySelector('canvas').style.border = 'solid 1px gray';
  if (margin) {
    document.querySelector('canvas').style.margin = '50px';
  }
  document.addEventListener('contextmenu', (e) => e.preventDefault());

  background(255);
  noStroke();
  frameRate(30);

  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  noLoop();

  ojkSprite = new Sprite();
};

class Sprite {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = 'coral';
    this.state = true;
    this.draw();
  }

  draw() {
    background(255);
    fill(this.col);
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
    this.state = !this.state;
  }

  move(steps = 10) {
    this.x += this.dir.x * steps;
    this.y += this.dir.y * steps;
    this.draw();
  }

  turn(dir) {
    switch (dir) {
      case 'N':
        this.dir.x = 0;
        this.dir.y = -1;
        break;
      case 'S':
        this.dir.x = 0;
        this.dir.y = 1;
        break;
      case 'E':
        this.dir.x = 1;
        this.dir.y = 0;
        break;
      case 'W':
        this.dir.x = -1;
        this.dir.y = 0;
        break;
      default:
        console.error('方向はN/S/E/Wで指定してください');
        noLoop();
        break;
    }
    this.draw();
  }

  async say(msg) {
    if (msg.length > 10) {
      console.log('10文字までしか話せません');
      return;
    }
    text(msg, this.x, this.y - 40);
  }

  changeColor(col = 'coral') {
    this.col = col;
    this.draw();
  }

  goTo(x, y) {
    this.erasePrev();
    this.x = x;
    this.y = y;
    this.draw();
  }

  setX(x) {
    this.erasePrev();
    this.x = x;
    this.draw();
  }

  setY(y) {
    this.erasePrev();
    this.y = y;
    this.draw();
  }
}

/* メソッドを直接呼び出せるように */

p5.prototype.sleep = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

p5.prototype.move = (steps) => {
  ojkSprite.move(steps);
};

p5.prototype.say = (msg) => {
  ojkSprite.say(msg);
};

p5.prototype.turn = (dir) => {
  ojkSprite.turn(dir);
};

p5.prototype.goTo = (x, y) => {
  ojkSprite.goTo(x, y);
};

p5.prototype.setX = (x) => {
  ojkSprite.setX(x);
};

p5.prototype.setY = (y) => {
  ojkSprite.setY(y);
};

p5.prototype.changeColor = (col) => {
  ojkSprite.changeColor(col);
};

/* メソッドを日本語でも呼び出せるように */

p5.prototype['待つ'] = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

p5.prototype['◯歩進む'] = (steps) => {
  ojkSprite.move(steps);
};
