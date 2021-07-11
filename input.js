const keys = {
  'w': {keyCode: 87, valCur: 0, valPrev: 0},
  'a': {keyCode: 65, valCur: 0, valPrev: 0},
  's': {keyCode: 83, valCur: 0, valPrev: 0},
  'd': {keyCode: 68, valCur: 0, valPrev: 0},
}

var moveX = {vaPrev: 0, valCur: 0};
var moveY = {vaPrev: 0, valCur: 0};
  
function moveSetVal() {
  moveX.valPrev = moveX.valCur;
  moveX.valCur = keys.d.valCur - keys.a.valCur;
  moveY.valPrev = moveY.valCur;
  moveY.valCur = keys.s.valCur - keys.w.valCur;
}

//Get current value of key, set previous value of key
function keySetVal(k) {
  keys[k].valPrev = keys[k].valCur;
  keys[k].valCur = keyIsDown(keys[k].keyCode) ? 1 : 0;
} 