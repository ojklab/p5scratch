/*jshint esversion: 8 */
// noprotect

function setup() {
  // Sprite.flushScreen = false;
  // Sprite.withBody = false;
  createCanvas(480, 360);
  start(100, 200);
}

async function draw() {
  const dir = [0, 270, 180, 90];
  say("動きます");
  await sleep(1);

  for (const d of dir) {
    for (let i = 0; i < 3; i += 1) {
      walk(20);
      say(i);
      await sleep(0.5);
    }
    turn(d);
  }

  return;
  for (let i = 0; i < 12; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      walk(10);
      await sleep(0.5);
    }
    walk(5);
    await sleep(0.5);
  }

  say("hello");
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
