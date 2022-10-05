/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();
  Sprite.flushScreen = false;
  setColor('orange');

  await sleep(1);
  // turn('N');
  const dir = ['右', '上', '左', '下'];

  for (let i = 0; i < 40; i += 1) {
    turn(dir[i % 4]);
    for (let j = 0; j < 10; j += 1) {
      walk(10);
      await sleep(0.3);
    }
    say('う〜ん');
    await sleep(1);
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
