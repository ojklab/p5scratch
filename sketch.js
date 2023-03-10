/* jshint esversion: 8 */
// noprotect

function setup() {
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す

  loop(); // drawを再開
  frameRate(10);
}

let list = [];
let eatTime = 0;

async function draw() {
  // 10匹まで魚を配列に入れておく
  if (list.length < 10) {
    list.push({
      x: randomInt(0, width),
      y: randomInt(0, height),
      col: randomColor()
    });
  }

  // 魚を描画する
  for (const fish of list) {
    putFish(fish.x, fish.y, fish.col);
  }

  // 歩かせる
  let eaten = walk(10);
  print(eaten);
  if (eaten) {
    eatTime = floor(frameCount / 10) + 2;
  } else {
    if (frameCount / 10 > eatTime) say("");
  }

  fill(0);
  noStroke();
  text(floor(frameCount / 10), 10, 10);
  stroke(0);
  fill(255);

  // 端まで行ったら切り返す
  if (getY() > height || getY() < 0 || getX() < 0 || getX() > width) {
    turnBack();
  }
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    turn("上");
  } else if (keyCode == DOWN_ARROW) {
    turn("下");
  } else if (keyCode == RIGHT_ARROW) {
    turn("右");
  } else if (keyCode == LEFT_ARROW) {
    turn("左");
  }
}
