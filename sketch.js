/*jshint esversion: 8 */
// noprotect

async function setup() {
  start(100, 200, true);
  await sleep(1);

  // ここから下にコードを書いていきます

  setX(300); // x座標300の位置へ移動
  await sleep(1);

  setY(60); // y座標60の位置へ移動
  await sleep(1);

  setXY(240, 180); // (x, y)=(240, 180)の位置へ移動
  await sleep(1);

  say("ここが真ん中だよ");
}

function mousePressed() {
  const col = color(random(360), random(50, 100), random(50, 100));
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
