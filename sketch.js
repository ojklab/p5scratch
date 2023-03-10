function setup() {
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す

  // loop(); // drawを再開
  frameRate(10);
}

let list = [];

async function draw() {
  // background(200);

  await sayFor("aaa", 2);
  walk(50);
  await sleep(1);
  turn("上");
  await sleep(1);
  walk(50);
  await sayFor("bbb", 2);
  walk(50);

  if (list.length < 10) {
    list.push({ x: width / 2, y: height / 2, col: randomColor() });
    print(list);
  }

  /*
    if (list.length < 10) {
    list.push({
      x: randomInt(0, width),
      y: randomInt(0, height),
      col: randomColor()
    });
  }
  */

  for (const fish of list) {
    putFish(fish.x, fish.y, fish.col);
  }

  walk(10);
  say(floor(frameCount / 10));

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
