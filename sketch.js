/*jshint esversion: 8 */
// noprotect

async function setup() {
  Sprite.flushScreen = false;
  // Sprite.withBody = false;
  start(240, 180, true);
  // await sleep(1);

  setXY(310, 180);

  setXY(170, 180);
  setXY(100, 180);

  turn("下");
  setXY(240, 300);

  setXY(240, 60);

  // return;
  setXY(60, 60);
  turn("右");
  for (let i = 0; i < 50; i += 1) {
    walk(10);
    await sleep(0.5);
  }

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
  }
}
