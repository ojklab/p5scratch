p5.prototype.sleep = (sec) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), sec * 1000);
  });
};

class Sprite {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.dir = { x: 1, y: 0 };
    this.col = 'coral';
    this.s = true;
  }

  draw() {
    fill(this.col);
    if (this.s) {
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
    this.s = !this.s;
  }

  erasePrev() {
    fill(255);
    circle(this.x, this.y, 51);
  }

  walk(steps = 10) {
    this.erasePrev();
    this.x += this.dir.x * steps;
    this.y += this.dir.y * steps;
    this.draw();
  }

  rotate(dir) {
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

  async say(msg, sec = 2) {
    if (msg.length > 10) {
      console.log('10文字までしか話せません');
      return;
    }
    text(msg, this.x, this.y - 40);
    await sleep(sec);
    fill(255);
    rect(this.x, this.y - 40, 100, 25);
  }

  setColor(col = 'coral') {
    this.col = col;
    this.draw();
  }

  setPosition(x, y) {
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

p5.prototype.startScratch = (margin = false) => {
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
};
