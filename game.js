var map = [];
var view = {};
var player = {};
var entities = [];
var mmx = 0;
var mmy = 0;
var easystar = new EasyStar.js();
function logMeta(m) {
    console.log(m);
}

function indexOfId(a, t) {
	const matchesId = (e) => e.id === t;
	return a.findIndex(matchesId);
}