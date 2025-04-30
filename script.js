kaplay({
	width: 640,
	height: 384,
	canvas: document.querySelector("#mycanvas"),
	background: [211, 100, 119],
});

loadSprite("kat", "./sprites/32x32/kat.png");
const cat = add([sprite("kat"), pos(50, 50), "cat"]);
