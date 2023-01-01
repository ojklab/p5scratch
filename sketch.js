/*jshint esversion: 8 */
// noprotect

function setup() {
  // Sprite.flushScreen = false;
  // Sprite.withBody = false;
  createCanvas(480, 360);
  start(240, 180);
}

async function draw() {
  await sleep(1);
  const dir = ["上", "左", "下", "右"];

  for (let i = 0; i < height; i += 30) {
    putFish(300, i);
  }
  say("hello");
  stroke(0);
  line(0, height / 2, width, height / 2);
  line(width / 2, 0, width / 2, height);

  /*
  for (let i = 0; i < 12; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      walk(10);
      await sleep(0.5);
    }
    turn(dir[i % 4]);
  }
  */
}

function mousePressed() {
  const col = color(random(100, 255), random(100, 255), random(100, 255));
  putFish(mouseX, mouseY, col);
}

function keyPressed() {
  const x = getX();
  const y = getY();
  const step = 30;
  if (keyCode === LEFT_ARROW) {
    // turn('左');
    // walk(10);
    setX(x - step);
  } else if (keyCode === RIGHT_ARROW) {
    setX(x + step);
  } else if (keyCode === UP_ARROW) {
    setY(y - step);
  } else if (keyCode === DOWN_ARROW) {
    setY(y + step);
  } else if (keyCode === SHIFT) {
    moveFish();
  } else if (key === "s") {
    say("こんにちは");
  }
}
