class View {
  constructor(width, height, cellSize, map) {
    this.width = width;
    this.height = height;

    this.cellSize = cellSize;
    this.map = map;
    this.target = undefined;
    this.showMeta = true;

    this.minX = 0;
    this.minY = 0;
    this.maxX = this.minX + (this.width);
    this.maxY = this.minY + (this.height);

    this.minXCur = 0;
    this.maxXCur = this.width -1;
    this.minYCur = 0;
    this.maxYCur = this.height -1;

    this.offsetMinX = Math.round(this.width / 6);
    this.offsetMinY = Math.round(this.height / 6);
    logMeta('🖥️ created View');
  }

  show(cs, m) {
    for(var x = 0; x < this.width; x++) {
      for(var y = 0; y < this.height; y++) {
        if (m.map[this.minX+x][this.minY+y].occupant) {
          fill('blue');
        } else if (m.grid[this.minX+x][this.minY+y] === 1) {
          fill('black');
          stroke('black');
        } else if (m.grid[this.minX+x][this.minY+y] === 0) {
          fill('lightgray');
          stroke('darkgray');
        }
        rect(x*cs, y*cs, cs, cs);
      }
    }
  }

  move(x, y) {
    let i = indexOfId(entities, this.target);

      let minXNew = this.minX + x;
      let maxXNew = minXNew + (this.width);
      let minYNew = this.minY + y;
      let maxYNew = minYNew + (this.height);
    
    // If the view has no target.
    if (i === -1) {
      if ((minXNew >= 0 && maxXNew <= this.map.width)) {
        this.minX = minXNew;
        this.maxX = maxXNew;
      }
      if ((minYNew >= 0 && maxYNew <= this.map.height)) {
        this.minY = minYNew;
        this.maxY = maxYNew;
      }
    }
    else {
      if (!entities[i].checkForBounds(this.map, entities[i].posX.valCur+x, entities[i].posY.valCur+y)) {
        if (minXNew >= 0 && maxXNew <= this.map.width) { 
          if ((x > 0 && entities[i].posX.valCur+x >= maxXNew-(this.offsetMinX+1)) ||
          x < 0 && entities[i].posX.valCur+x <= minXNew+(this.offsetMinX)) {
            this.minX = minXNew;
            this.maxX = maxXNew;
            }
        }
        if (minYNew >= 0 && maxYNew <= this.map.height) {
          if ((y > 0 && entities[i].posY.valCur+y >= maxYNew-(this.offsetMinY+1)) ||
          y < 0 && entities[i].posY.valCur+y <= minYNew+(this.offsetMinY)) {
            this.minY = minYNew;
            this.maxY = maxYNew;
          }
        }
      }
    }
  }
}