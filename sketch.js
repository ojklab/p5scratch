/*jshint esversion: 8 */
// noprotect

function setup() {
  // Sprite.flushScreen = false;
  // Sprite.withBody = false;
  start();
}

async function draw() {
  await sleep(1);
  walk(50);
  await sleep(0.5);
  walk(50);
  await sleep(0.5);
  walk(50);
  await sleep(0.5);
  walk(50);
  await sleep(0.5);
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
