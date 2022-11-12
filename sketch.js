/*jshint esversion: 8 */
// noprotect

async function setup() {
  // Sprite.flushScreen = false;
  // Sprite.withBody = false;
  start(240, 180, true);
  await sleep(1);

  turn("下");
  setXY(170, 30);
  setXY(170, 35);
  setXY(170, 180);
  setXY(100, 30);
  setXY(100, 35);
  setXY(100, 180);
  say("Hello");
  setXY(310, 330);
  setXY(310, 335);
  setXY(310, 180);
  setXY(380, 330);
  setXY(380, 335);
  setXY(380, 180);
  say("Hello");

  // ここから下にコードを書いていきます
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
