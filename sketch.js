async function setup() {
  startScratch(true);

  let maru = new Sprite(0, height / 2);
  let maru2 = new Sprite(width, height / 2);

  maru2.rotate('W');
  maru2.setColor('royalblue');
  for (let i = 0; i < 20; i += 1) {
    maru2.walk(10);
    await sleep(0.3);
  }

  for (let i = 0; i < 10; i += 1) {
    maru.setPosition(i * 10, i * 10);
    await sleep(0.3);
  }

  maru.say('こんにちは');

  /*
  let x = 0;
  while (x < width) {
    maru.walk(10);
    await sleep(0.5);
    if (x > width / 2) {
      maru.rotate('N');
    }
    x += 10;
  }
  */
}
