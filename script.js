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
	// loadSprite("player", "./sprites/32x32/cat-sheet.png", {
	// 	sliceX: 4,
	// 	sliceY: 1,
	// 	anims: {
	// 		walk: { from: 0, to: 3, loop: true },
	// 	},
	// });
	loadSprite("cat", "./sprites/sonny-complete3.png", {
		sliceX: 3,
		sliceY: 3,
		anims: {
			walk: { from: 0, to: 5, loop: true },
			jump: { from: 6, to: 6, loop: false },
			crouch: { from: 7, to: 7, loop: false },
		},
	});
	loadSprite("kat", "./sprites/32x32/kat.png");
	loadSprite("dirt", "./sprites/32x32/dirt.png");
	loadSprite("grass-angle-left", "./sprites/32x32/grass-angle-left.png");
	loadSprite("grass-angle-right", "./sprites/32x32/grass-angle-right.png");
	loadSprite("grass", "./sprites/32x32/grass.png");
	loadSprite("blades", "./sprites/32x32/blades.png");

	// const player = add([
	// 	sprite("player"),
	// 	pos(50, 50),
	// 	body(),
	// 	area(),
	// 	offscreen({ destroy: true }),
	// 	"player",
	// 	{ speed: 300 },
	// ]);
	const player = add([
		sprite("cat"),
		pos(50, 50),
		body(),
		area(),
		offscreen({ destroy: true }),
		"player",
		{
			speed: 300,
		},
	]);
	const dirt = make([sprite("dirt")]);

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

	// ----------------------------------------------
	player.onKeyDown((key) => {
		if (key === "right" || key === "d") {
			player.move(player.speed, 0);
			player.flipX = false;
		}
		if (key === "left" || key === "a") {
			player.move(0 - player.speed, 0);
			player.flipX = true;
		}
		if (key === "down" || key === "s") {
			player.move(0, player.speed);
		}
		if (key === "up" || key === "w") {
			player.move(0, 0 - player.speed);
		}
	});

	player.onKeyPress((key) => {
		if (key === "right" || key === "d") {
			player.play("walk");
		}
		if (key === "left" || key === "a") {
			player.play("walk");
		}
		if (key === "up" || key === "w") {
			player.play("jump");
		}
		if (key === "down" || key === "s") {
			player.play("crouch");
		}
	});

	player.onKeyRelease((key) => {
		if (key === "right" || key === "d") {
			player.stop("walk");
			player.frame = 0;
		}
		if (key === "left" || key === "a") {
			player.stop("walk");
			player.frame = 0;
		}
		if (key === "up" || key === "w") {
			player.stop("jump");
			player.frame = 0;
		}
		if (key === "down" || key === "s") {
			player.stop("crouch");
			player.frame = 0;
		}
	});

	onUpdate(() => {
		if (player.pos.x < 0) {
			player.pos.x = 0;
		}
		if (player.pos.x > width()) {
			player.pos.x = width();
		}
		if (player.pos.y < 0) {
			player.pos.y = 0;
		}
		if (player.pos.y > height()) {
			player.pos.y = height();
		}
	});
});

go("game");
