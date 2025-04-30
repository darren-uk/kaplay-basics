kaplay({
	width: 640,
	height: 384,
	canvas: document.querySelector("#mycanvas"),
	// background: [211, 100, 119],
	gravity: 500,
});

scene("game", () => {
	setGravity(500);
	loadSprite("kat", "./sprites/32x32/kat.png");
	loadSprite("dirt", "./sprites/32x32/dirt.png");
	const cat = add([
		sprite("kat"),
		pos(50, 50),
		body(),
		area(),
		rotate(),
		anchor("center"),
		"cat",
		{ speed: 300 },
	]);

	addLevel(
		[
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"                                        ",
			"########################################",
		],
		{
			tileWidth: 16,
			tileHeight: 16,
			tiles: {
				"#": () => [
					sprite("dirt"),
					area(),
					body({ isStatic: true }),
					scale(0.5),
					"dirt",
				],
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
});

go("game");
