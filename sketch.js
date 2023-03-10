/* jshint esversion: 8 */
// noprotect

function setup() {
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す

  loop(); // drawを再開
  frameRate(10);
}

let fishList = [];
let sayTime = 0;
let score = 0;
const timeLimit = 20;

async function draw() {
  const sec = floor(frameCount / 10); // 現在の秒数

  // 10匹まで魚を配列に入れておく
  if (fishList.length < 10) {
    fishList.push({
      x: randomInt(0, width),
      y: randomInt(30, height), // 表示部分は除外
      col: randomColor()
    });
  }

  // 魚を描画する
  for (const fish of fishList) {
    putFish(fish.x, fish.y, fish.col);
  }

  // 歩かせる
  let eaten = move(10);
  if (eaten != false) {
    sayTime = sec + 1;
    say("ぱくっ");
    score += 1;
    removeFish(eaten);
  } else {
    if (sec > sayTime) say("");
  }

  // 端まで行ったら切り返す
  if (isOutside() == true) {
    turnBack();
  }

  // p5.jsの関数はdraw関数の最後に呼び出す
  fill("navy");
  rect(0, 0, 100, 30);
  fill("firebrick");
  rect(width - 75, 0, width, 30);
  fill("white");
  text("残り時間：" + (timeLimit - sec), 10, 20);
  text("得点：" + score, width - 60, 20);

  if (timeLimit - sec <= 0) {
    say(`得点は ${score} 点でした`);
    noLoop();
  }
}

function isOutside() {
  let x = getX();
  let y = getY();
  if (x < 0 || x > width || y > height || y < 0) {
    return true;
  } else {
    return false;
  }
}

function removeFish(eaten) {
  for (let i = 0; i < fishList.length; i += 1) {
    if (fishList[i].x == eaten.x && fishList[i].y == eaten.y) {
      fishList.splice(i, 1);
    }
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
  } else if (key == "r") {
    frameCount = 0;
    score = 0;
    loop();
  }
}
