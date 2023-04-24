/* jshint esversion: 8 */
// noprotect

function setup() {
  Sprite.flushScreen = false;
  createCanvas(480, 360); // キャンバスを描画
  // start(240, 180, { col: "skyblue", dir: { x: -1, y: 0 } }); // ピゴニャンを呼び出す
  start(100, 200);
}

async function draw() {
  await sleep(1);

  for (let i = 0; i < 10; i += 1) {
    move(75);
    // turn(random(["上", "下", "右", "左"]));
    if (i % 2 == 0) {
      say("エッ");
    } else {
      say("ホッ");
    }
    await sleep(0.5);
  }
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
