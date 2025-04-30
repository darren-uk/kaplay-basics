kaplay();

const k = kaplay();
k.setGravity(500);
k.setBackground(198,247,246);
loadSprite("kat", "./sprites/kat.png");
loadSprite("grass", "./sprites/grass.png");
loadSprite("grass-angle-left", "./sprites/grass-angle-left.png");
loadSprite("grass-angle-right", "./sprites/grass-angle-right.png");
loadSprite("dirt", "./sprites/dirt.png");
loadSprite("sky", "./sprites/sky.png");

const cat = add([
	sprite("kat"),
	area(),
    body(),
    pos(50, 50),
    rotate(),
    anchor("center"),
	"cat",
	{ speed: 300 },
]);
const sky = add([
	sprite("sky"),
	z(-10),
	pos(0, 0),
]);

addLevel(
	[
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
		"                           ",
        "                           ",
        "=============#    ?========",
		"++++++++++++++====+++++++++",
		"+++++++++++++++++++++++++++",
	],
	{
		tileWidth: 32,
		tileHeight: 32,
		tiles: {
			"=": () => [sprite("grass"), area(), body({ isStatic: true }), scale(0.5)],
			"+": () => [sprite("dirt"), area(), body({ isStatic: true }), scale(0.5)],
			"#": () => [sprite("grass-angle-left"), area({ shape: new Polygon([vec2(0), vec2(64,64), vec2(0, 64)]) }), body({ isStatic: true }), scale(0.5)],
			"?": () => [sprite("grass-angle-right"), area({ shape: new Polygon([vec2(64,0), vec2(64,64), vec2(0, 64)]) }), body({ isStatic: true }), scale(0.5)],
		},
	}
);

cat.onKeyDown((key) => {
	if (key === "right" || key === "d") {
		cat.move(cat.speed, 0);
        cat.angle = 20;
	}
	if (key === "left" || key === "a") {
		cat.move(0 - cat.speed, 0);
		cat.angle = -20;
	}
	if (key === "down" || key === "s") {
		cat.move(0, cat.speed);
		cat.angle = 0;
	}
	if (key === "up" || key === "w") {
		cat.move(0, 0 - cat.speed);
		cat.angle = 0;
	}
});

cat.onKeyRelease((key) => {
	if (key === "right" || key === "left" || key === "d" || key === "a") {
		cat.angle = 0;
	}
});
