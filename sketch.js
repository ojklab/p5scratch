function setup() {
  startScratch();

  const maru = new Sprite();
  for (let i = 0; i < 10; i += 1) {
    maru.walk(10);
    sleep(0.5);
  }
}
