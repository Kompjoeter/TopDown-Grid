class View {
  constructor(width, height, cellSize, grid) {
    this.width = width;
    this.height = height;

    this.cellSize = cellSize;
    this.grid = grid;

    this.minX = 0;
    this.minY = 0;
    this.maxX = this.minX + (this.width);
    this.maxY = this.minY + (this.height);

    this.minXCur = 0;
    this.maxXCur = this.width -1;
    this.minYCur = 0;
    this.maxYCur = this.height -1;
  }

  gridDraw(cs, g) {
    for(var x = 0; x < this.width; x++) {
        for(var y = 0; y < this.height; y++) {
          if (g.grid[this.minX+x][this.minY+y].filled === true) {
            fill('yellow')
          } else if (g.grid[this.minX+x][this.minY+y].filled === false) {
            fill('teal');
          }
          rect(x*cs, y*cs, cs, cs);
        }
    }
  }

  move(x, y) {
    let minXNew = this.minX + x;
    let maxXNew = minXNew + (this.width);
    let minYNew = this.minY + y;
    let maxYNew = minYNew + (this.height);
    
    if (minXNew >= 0 && maxXNew <= this.grid.width) {
      this.minX = minXNew;
      this.maxX = maxXNew;
    }
    if (minYNew >= 0 && maxYNew <= this.grid.height) {
      this.minY = minYNew;
      this.maxY = maxYNew;
    }
  }
}