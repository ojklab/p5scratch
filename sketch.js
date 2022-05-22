async function setup() {
  startScratch();

  const maru1 = new Sprite(-200, 0);
  const maru2 = new Sprite(200, 0);
  maru2.setColor('royalblue');
  maru2.rotate('W');

  for (let i = 0; i < 20; i += 1) {
    maru1.walk(10);
    maru2.walk(20);
    await sleep(0.5);
  }
}
