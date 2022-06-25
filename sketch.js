/*jshint esversion: 8 */
// noprotect

async function setup() {
  start();
  await sleep(1);

  say('100 + 100 は…');
  await sleep(2);
  say(100 + 100);
  await sleep(1);

  walk(10);
  await sleep(0.5);
  walk(10);
  await sleep(0.5);
  walk(10);
  await sleep(0.5);
  walk(10);
  await sleep(0.5);
  walk(10);
  await sleep(0.5);

  say('Say');
  await sleep(1);
  say('Yes!');
  await sleep(1);

  walk(10);
}

function keyPressed() {
  let x = getX();
  if (keyCode === LEFT_ARROW) {
    setX(x - 10);
  } else if (keyCode === RIGHT_ARROW) {
    setX(x + 10);
  }
}
