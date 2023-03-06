/* jshint esversion: 8 */
// noprotect

function setup() {
  createCanvas(480, 360); // キャンバスを描画
  start(100, 200); // ピゴニャンを呼び出す
}

async function draw() {
  await sleep(1);

  for (let i = 0; i < 20; i += 1) {
    walk(20);
    await sleep(0.5);
  }

  /*
  while (true) {
    for (let i = 0; i < 30; i += 1) {
      walk(15);
      await sleep(0.5);

      // マウスボタンが押されたら…
      if (mouseIsPressed == true) {
        setX(width / 2); // 水平中央に移動
        setColor("random"); // 色をランダムに変更
        break; // ループから抜ける
      }
    }
  }
  */
}

function mouseClicked() {
  // setX(width / 2);
  // setColor("random");
  putFish(mouseX, mouseY, "random");
}
