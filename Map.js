class Map {
  constructor(width, height) {
      this.width = width;
      this.height = height;
      this.grid = this.gridCreate(this.width, this.height); 
  }
  
  gridCreate(w, h) {
    let a = [];
    let filled;
    for(var x = 0; x < w; x++) {
        a[x] = [];
        for(var y = 0; y < h; y++) {
          let rand = Math.floor(Math.random() * 2);
          if (rand) {
            filled = true;
          } else {
            filled = false;
          }
          if (x === (w-1) || x === 0 || y === 0 || y === (h-1)) {
            filled = true;
          }
          a[x][y] = {posX: x, posY: y, filled: filled}
        }
    }
    return a;
  }
}