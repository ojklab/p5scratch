/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();
  await sleep(1);

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      walk(10);
      await sleep(0.3);
    }
    say('う〜ん');
    await sleep(1);
    turnBack();
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
