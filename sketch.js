/* jshint esversion: 8 */
// noprotect

function setup() {
  // Sprite.flushScreen = false;
  createCanvas(480, 360); // キャンバスを描画
  start(240, 180); // ピゴニャンを呼び出す
}

async function draw() {
  await sleep(2);
  setX(200);
  await sleep(2);
  setY(100);
  await sleep(2);
  goTo(100, 200);
  await sleep(2);
  turn("下");
  await sleep(2);
  goTo(200, 100);
  await sleep(2);
}

/*
  fill("white");
  putFish(100, 100);

  noStroke();
  circle(100, 100, 3);
  stroke("red");
  line(100 - 15, 100 - 7.5, 100 - 15, 100 + 7.5);
  line(100 + 22, 100 - 7.5, 100 + 22, 100 + 7.5);
  line(100 - 15, 100 - 7.5, 100 + 22, 100 - 7.5);
  line(100 - 15, 100 + 7.5, 100 + 22, 100 + 7.5);

  noStroke();
  circle(getX(), getY(), 3);
  circle(getX(), getY() - 14, 3);
  stroke("blue");
  line(getX() - 30, getY() - 36, getX() + 30, getY() - 36);
  line(getX() - 30, getY() + 28, getX() + 30, getY() + 28);
  // return;
*/
