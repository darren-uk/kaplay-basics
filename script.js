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

	loadSprite("player", "./sprites/sonny-complete3.png", {
		sliceX: 3,
		sliceY: 3,
		anims: {
			walk: { from: 0, to: 5, loop: true },
			jump: { from: 6, to: 6, loop: false },
			crouch: { from: 7, to: 7, loop: false },
		},
	});
	loadSprite("grass", "./sprites/grass2.png");
	loadSprite("bush", "./sprites/bush2.png");
	loadSprite("house", "./sprites/house.png");
	const house = add([sprite("house"), pos(0, -10), area()]);
	const bush1 = add([sprite("bush"), pos(200, 30), area()]);
	const bush2 = add([sprite("bush"), pos(-180, 30), area()]);

	const player = add([
		sprite("player"),
		pos(50, 50),
		body(),
		area(),
		offscreen({ destroy: true }),
		"player",
		{
			speed: 300,
		},
	]);
	const grass = add([sprite("grass"), pos(0, 272), area()]);

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
			"                    ",
			"                    ",
			"xxxxxxxxxxx    xxxxx",
			"xxxxxxxxxxxxxxxxxxxx",
		],
		{
			tileWidth: 32,
			tileHeight: 32,
			tiles: {
				"x": () => [
					rect(32, 32),
					opacity(0),
					area(),
					body({ isStatic: true }),
					"blank",
				],

				// "l": () => [
				// 	sprite("grass-angle-left"),
				// 	area({ shape: new Polygon([vec2(0), vec2(64, 64), vec2(0, 64)]) }),
				// 	body({ isStatic: true }),
				// 	"dirt",
				// ],
				// "r": () => [
				// 	sprite("grass-angle-right"),
				// 	area({
				// 		shape: new Polygon([vec2(64, 0), vec2(64, 64), vec2(0, 64)]),
				// 	}),
				// 	body({ isStatic: true }),
				// 	"dirt",
				// ],
				// "b": () => [sprite("blades"), area(), "blades"],
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
