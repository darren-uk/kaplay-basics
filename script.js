// Stage set to W 640px x  H 384px
// block at 16px = 40 blocks x 24 blocks
// block at 32px = 20 blocks x 12 blocks

kaplay({
	width: 640,
	height: 384,
	canvas: document.querySelector("#mycanvas"),
	background: [158, 158, 217],
	gravity: 500,
});

scene("game", () => {
	setGravity(500);
	loadSprite("kat", "./sprites/32x32/kat.png");
	loadSprite("dirt", "./sprites/32x32/dirt.png");
	loadSprite("grass-angle-left", "./sprites/32x32/grass-angle-left.png");
	loadSprite("grass-angle-right", "./sprites/32x32/grass-angle-right.png");
	loadSprite("grass", "./sprites/32x32/grass.png");
	loadSprite("blades", "./sprites/32x32/blades.png");
	const cat = add([
		sprite("kat"),
		pos(50, 50),
		body(),
		area(),
		rotate(),
		anchor("center"),
		offscreen({ destroy: true }),
		"cat",
		{ speed: 300 },
	]);

	addLevel(
		[
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"bbbbbbb         bbbb",
			"gggggggg l    r gggggg",
			"xxxxxxxxxxxxxxxxxxxx",
			"xxxxxxxxxxxxxxxxxxxx",
		],
		{
			tileWidth: 32,
			tileHeight: 32,
			tiles: {
				"x": () => [sprite("dirt"), area(), body({ isStatic: true }), "dirt"],
				"g": () => [sprite("grass"), area(), body({ isStatic: true }), "dirt"],
				"l": () => [
					sprite("grass-angle-left"),
					area({ shape: new Polygon([vec2(0), vec2(64, 64), vec2(0, 64)]) }),
					body({ isStatic: true }),
					"dirt",
				],
				"r": () => [
					sprite("grass-angle-right"),
					area({
						shape: new Polygon([vec2(64, 0), vec2(64, 64), vec2(0, 64)]),
					}),
					body({ isStatic: true }),
					"dirt",
				],
				"b": () => [sprite("blades"), area(), "blades"],
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

	// checks if cat is offscreen and resets position
	// onUpdate(() => {
	// 	if (cat.pos.x < 0) {
	// 		cat.pos.x = 50;
	// 		cat.pos.y = 50;
	// 	}
	// 	if (cat.pos.x > width()) {
	// 		cat.pos.x = 50;
	// 		cat.pos.y = 50;
	// 	}
	// });

	// bounce off edge of screen
	onUpdate(() => {
		if (cat.pos.x < 0) {
			cat.pos.x = 0;
		}
		if (cat.pos.x > width()) {
			cat.pos.x = width();
		}
	});
});

go("game");
