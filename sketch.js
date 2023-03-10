/* jshint esversion: 8 */
// noprotect

function setup() {
  // Sprite.flushScreen = false;
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す
  loop();
  frameRate(10);
}

async function draw() {
  // move(8);
  // goTo(240, 0);
  // turn("下");
  // move(80);
  // move(80);
  // move(80);
  // goTo(340, 360);
  // turn("上");
  // move(80);
  // move(80);
  // move(80);
}

function keyPressed() {
  if (keyCode == UP_ARROW) {
    turn("上");
    move(20);
  } else if (keyCode == DOWN_ARROW) {
    turn("下");
    move(20);
  } else if (keyCode == RIGHT_ARROW) {
    turn("右");
    move(20);
  } else if (keyCode == LEFT_ARROW) {
    turn("左");
    move(20);
  } else {
    background(255);
  }
}
