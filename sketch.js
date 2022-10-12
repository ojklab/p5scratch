/*jshint esversion: 8 */
// noprotect

async function setup() {
  start(100, 180, true); // ピゴニャンの登場位置を変更
  await sleep(1);

  // ここから下にコードを書いていきます

  fill(255, 0, 127);
  stroke("blue");
  circle(240, 180, 100);
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
