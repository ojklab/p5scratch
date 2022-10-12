/*jshint esversion: 8 */
// noprotect

async function setup() {
  start(100, 300, true);
  await sleep(1);
  Sprite.flushScreen = false;

  // ここから下にコードを書いていきます

  say(getXY()); // 座標(100, 200)の位置にいる

  await sleep(1);
  walk(200); // 右方向に200進む（x座標は 100+200→300 に移動）
  say(getX()); // ピゴニャンは「300」としゃべる

  await sleep(1);
  setY(100);
  say(getY()); // ピゴニャンは「100」としゃべる
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
