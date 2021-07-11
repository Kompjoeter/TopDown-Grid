function setup() {
  const c = createCanvas(24*16, 24*16);
  c.parent('canvas-container');
  map = new Map(64,64);
  view = new View(24, 24, 16, map);
	player = new Entity(1, 1, 10, 10, 'Player');
  entities.push(player);
  // view.target = entities[0].id;
}
  
function draw() {
  background(220);
  stroke('black');

  for (const key in keys) {
    keySetVal(key);
	}
  moveSetVal();
  // if ((moveX.valPrev !== moveX.valCur) || (moveY.valPrev !== moveY.valCur)) {
    view.move(moveX.valPrev, moveY.valPrev);
    // entities[0].move(map,moveX.valPrev,moveY.valPrev);
  // }
	view.show(view.cellSize, view.map);
  fill('red');
  rect(Math.floor(mouseX / view.cellSize)*view.cellSize, Math.floor(mouseY / view.cellSize)*view.cellSize, view.cellSize, view.cellSize);
}

function mouseClicked() {
  entities[0].findPath(Math.floor(mouseX / view.cellSize)+view.minX, Math.floor(mouseY / view.cellSize)+view.minY);
}