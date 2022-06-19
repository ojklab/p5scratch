async function setup() {
  start();

  for (let i = 0; i < 10; i += 1) {
    move();
    await sleep(0.5);
  }
  say('こんにちは！');
  await sleep(2);
  turn('N');
  for (let i = 0; i < 10; i += 1) {
    move();
    await sleep(0.5);
  }
}
