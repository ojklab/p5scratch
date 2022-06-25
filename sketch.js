/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();
  await sleep(1);

  let x = 100; // 最初の場所

  while (x < 200) {
    moveToX(x);
    await sleep(0.5);

    x += 10; // x座標の更新
  }
  say('真ん中に到着〜');
}

function keyPressed() {
  let x = getX();
  if (keyCode === LEFT_ARROW) {
    setX(x - 10);
  } else if (keyCode === RIGHT_ARROW) {
    setX(x + 10);
  }
}
