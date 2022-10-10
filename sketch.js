/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();
  await sleep(1);

  // ここから下にコードを書いていきます

  walk(100);
  await sleep(1);

  turn('上'); // 上に向きを変える
  await sleep(1);
  walk(100);
  await sleep(1);

  turnBack(); // 向きを反転する
  await sleep(1);
  walk(100);
  await sleep(1);

  say('みどりいろに変身！');
  await sleep(1);
  setColor('aa'); // 色を変える
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
