/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();

  for (let y = 50; y < width; y += 50) {
    for (let x = 50; x < width; x += 50) {
      fill('royalblue');
      circle(x, y, 10);
    }
  }

  for (let i = 0; i < 10; i += 1) {
    walk(10);
    await sleep(0.5);
  }

  say('こんにちは！');
  await sleep(2);
  turn('N');

  for (let i = 0; i < 10; i += 1) {
    walk(10);
    await sleep(0.5);
  }
}

function keyPressed() {
  let x = getX();
  if (keyCode === LEFT_ARROW) {
    setX(x - 10);
  } else if (keyCode === RIGHT_ARROW) {
    setX(x + 10);
  }
}
