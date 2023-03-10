/* jshint esversion: 8 */
// noprotect

let fish_list = [];
const n_fish = 10;
const time_limit = 20;
const frame_rate = 10;
let say_time = time_limit;
let score = 0;

function setup() {
  Sprite.flushScreen = false;
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す

  frameRate(frame_rate); // フレームレート
  // loop(); // drawを再開
  turn("下");
  // turn("右");
}

function draw() {
  const sec = floor(frameCount / frame_rate); // 現在の秒数

  // 10匹まで魚を配列に入れておく
  if (fish_list.length < n_fish) {
    fish_list.push({
      x: randomInt(0, width),
      y: randomInt(30, height), // 表示部分は除外
      col: randomColor()
    });
  }

  // 魚を描画する
  for (const fish of fish_list) {
    putFish(fish.x, fish.y, fish.col);
  }

  // 歩かせる
  let eaten = move(80);

  // 魚を食べたときの処理
  if (eaten != false) {
    say_time = sec + 1;
    say("ぱくっ");
    score += 1;
    removeFish(eaten);
  } else {
    if (sec > say_time) {
      say("yes");
      print("sec");
    }
  }

  // 端まで行ったら切り返す
  if (isOutside() == true) {
    turnBack();
  }

  // 矢印キーで操作
  if (keyIsPressed) {
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

  // p5.jsの関数はdraw関数の最後に呼び出す
  fill("navy");
  rect(0, 0, 100, 30);
  fill("firebrick");
  rect(width - 75, 0, width, 30);
  fill("white");
  text("残り時間：" + (time_limit - sec), 10, 20);
  text("得点：" + score, width - 60, 20);

  if (time_limit - sec <= 0) {
    say(`得点は ${score} 点でした`);
    noLoop();
  }
}

/* ピゴニャンがキャンバスの外に出たかどうか */
function isOutside() {
  let x = getX();
  let y = getY();
  if (x < 0 || x > width || y > height || y < 0) {
    return true;
  } else {
    return false;
  }
}

/* 食べられた魚をリストから消す */
function removeFish(eaten) {
  for (let i = 0; i < fish_list.length; i += 1) {
    if (fish_list[i].x == eaten.x && fish_list[i].y == eaten.y) {
      fish_list.splice(i, 1);
    }
  }
}

/* リセットボタン */
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
  if (key == "r") {
    frameCount = 0;
    say();
    score = 0;
    loop();
  }
}
