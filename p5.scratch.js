class Sprite {
  constructor(_size = 50, _x = width / 2, _y = height / 2, _col = 'coral', _bg = 'white' ) {
    this.x = _x;
    this.y = _y;
    this.size = _size;
    this.dir = { x:1, y:0 };
    this.col = _col;
    this.bg = _bg;
    this.draw();
  }
  
  draw() {
    noStroke();
    fill(this.col);
    circle(this.x, this.y, this.size);    
  }
  
  walk(steps = 10) {
    fill(this.bg);
    circle(this.x, this.y, this.size);    
    this.x += this.dir.x * steps;
    this.y += this.dir.y * steps;
    this.draw();
  }

}

p5.prototype.startScratch = function(bg = 'white') {  
  createCanvas(400, 400);
  background(bg);
  frameRate(30);
  return new Sprite();
}
