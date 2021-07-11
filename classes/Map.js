class Map {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = this.create(this.width, this.height);
    this.grid = this.getFilledMap(this.map, this.width, this.height);
    this.id = uuidv4();
    logMeta(`🖥️ created Map with id: ${this.id}`);
  }
  
  create(w, h) {
    let a = [];
    let filled;
    let inc = .1;
    let yoff = 0;
    for(var x = 0; x < w; x++) {
        a[x] = [];
        let xoff = 0;
        for(var y = 0; y < h; y++) {
          var r = noise(xoff, yoff);
          xoff += inc;  
          if ((r*255 / 2) > 50) {
            filled = 1;
          } else {
            filled = 0;
          }
          if (x === (w-1) || x === 0 || y === 0 || y === (h-1)) {
            filled = 1;
          }
          a[x][y] = {posX: x, posY: y, filled: filled, occupant: undefined}
        }
        yoff += inc;
    }
    return a;
  }

  getFilledMap(m, w, h) {
    let a = [];
    for(var x = 0; x < w; x++) {
      a[x] = [];
      for(var y = 0; y < h; y++) {
        a[x][y] = m[x][y].filled;
      }
    }
    return a;
  }
}