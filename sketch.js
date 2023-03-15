/* jshint esversion: 8 */
// noprotect

let fish_list = [];
const n_fish = 10;
const time_limit = 20;
const frame_rate = 10;
let say_time = time_limit;
let score = 0;

function setup() {
  // Sprite.flushScreen = false;
  createCanvas(480, 360); // キャンバスを描画
  start(240, 180); // ピゴニャンを呼び出す
}

async function draw() {
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

  while (true) {
    putFish(random(173, 300), random(120, 240), "random");
    await sleep(0.1);
  }
}
