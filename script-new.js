kaplay({
	width: 640,
	height: 480,
	canvas: document.querySelector("#mycanvas"),
	// background: [158, 158, 217],
	background: [163, 60, 60],
	gravity: 500,
});

scene("game", () => {
	setGravity(500);
	setBackground([176, 237, 239]);
	setLayers(["bg", "backdrop", "obj", "foreground", "ui"], "obj");

	const score = add([text("score: 0"), pos(24, 24), layer("ui"), { value: 0 }]);
	const level = add([text("level: 1"), pos(24, 52), layer("ui"), { value: 1 }]);

	// ADD LEVEL
	async function main() {
		const mapData = await (await fetch("./assets/map.json")).json();

		// SCENE GLOBAL VARIABLES
		let startPositionX = 0;
		let startPositionY = 0;

		// LOAD SPRITES
		loadSprite("player", "./sprites/sheets/sonny-complete3.png", {
			sliceX: 3,
			sliceY: 3,
			anims: {
				walk: { from: 0, to: 5, loop: true },
				jump: { from: 6, to: 6, loop: false },
				crouch: { from: 7, to: 7, loop: false },
			},
		});
		loadSprite("houses", "./assets/backdrop.png");
		loadSprite("foreground", "./assets/foreground.png");

		//ADD graphics
		const houses = add([sprite("houses"), pos(0, 0), layer("backdrop")]);

		const foreground = add([
			sprite("foreground"),
			pos(0, 0),
			layer("foreground"),
		]);

		// ADD MAP SPRITE BEFORE LOADING COLLIDERS
		const map = add([
			rect(640, 480),
			pos(0, 0),
			layer("obj"),
			opacity(0),
			"map",
		]);

		// LOAD COLLIDERS
		for (const layer of mapData.layers) {
			if (layer.type === "tilelayer") continue;

			// if (layer.name === "positions") {
			// 	for (const object of layer.objects) {
			// 		startPositionX = object.x;
			// 		startPositionY = object.y;
			// 	}
			// 	continue;
			// }

			if (layer.name === "colliders") {
				for (const object of layer.objects) {
					const collider = map.add([
						rect(object.width, object.height),
						pos(object.x, object.y),
						area(),
						body({ isStatic: true }),
						color(RED),
						opacity(0),
						"wall",
					]);
				}

				continue;
			}
		}

		// ADD PLAYER SPRITE AFTER LOADING COLLIDERS FOR START POSITIONS TO LOAD

		const player = add([
			sprite("player"),
			// pos(startPositionX, startPositionY),
			pos(50, 50),
			area({
				shape: new Rect(vec2(0, 24), 64, 40),
			}),
			body(),
			anchor("center"),
			offscreen({ destroy: true }),
			layer("obj"),
			"player",
			{
				speed: 300,
			},
		]);

		// SET CONTROLS
		function playerControls() {
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
					player.move(0, 0 - player.speed * 2);
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

			// Stops player moving off edge of screen
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
		}
		playerControls();
	} // END OF MAIN()

	main();
}); // END OF SCENE

go("game");
