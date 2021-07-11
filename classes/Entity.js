class Entity {
    constructor(width, height, posX, posY, name) {
			this.width = width;
			this.height = height;
			this.posX = {valPrev: posX, valCur: posX, valGoal: posX};
			this.posY = {valPrev: posY, valCur: posY, valGoal: posY};
			this.path = [];
			this.name = name;
			this.colliding = false;
			this.id = uuidv4();
			logMeta(`🖥️ created Entity with id: ${this.id}`);
			this.move(map, 0,0);
    }

		findPath(x, y) {
			easystar.setGrid(map.grid);
			easystar.setAcceptableTiles([0]);
			// reverse xy in findPath call, that's just how it works.
			easystar.findPath(this.posY.valCur, this.posX.valCur, y, x, function( path ) {
				if (path === null) {
					console.log("Path was not found.");
				} else {
					console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
					entities[0].moveToGoal(path);
				}
			});
			easystar.setIterationsPerCalculation(1000);
			easystar.calculate();
		}

		moveToGoal(p) {
			for(let i = 0; i < p.length; i++) {
				setTimeout(function() {
					fill('orange');
					let x = 0;
					let y = 0;
					entities[0].posX.valGoal = p[i].y;
					entities[0].posY.valGoal = p[i].x;
					if (entities[0].posX.valCur !== entities[0].posX.valGoal) {
						if (entities[0].posX.valGoal > entities[0].posX.valCur) {
							x = 1;
						} else {
							x = -1;
						}
					}
					if (entities[0].posY.valCur !== entities[0].posY.valGoal) {
						if (entities[0].posY.valGoal > entities[0].posY.valCur) {
							y = 1;
						} else {
							y = -1;
						}
					}
					entities[0].move(map, x, y);
				},50 * i);
			}
		}

		move(m, x, y) {
			if (!this.checkForBounds(m, this.posX.valCur+x, this.posY.valCur+y)) {
				this.posX.valPrev = this.posX.valCur;
				this.posY.valPrev = this.posY.valCur;
				this.posX.valCur += x;
				this.posY.valCur += y;
				this.posToMap(m,this.posX,this.posY);
			}
		}

		posToMap(m,x,y) {
      if (m.map[x.valPrev][y.valPrev].occupant && m.map[x.valPrev][y.valPrev].occupant === this.id) {
				m.map[x.valPrev][y.valPrev].occupant = undefined;
			}
      m.map[x.valCur][y.valCur].occupant = this.id;
    }

		checkForBounds(m, x, y) {
			if (x < 0 || x > m.width-1 || y < 0 || y > m.height-1 || m.map[x][y].filled) {
				this.colliding = true;
				return true;
			}
			this.colliding = false;
			return false;
		}
}