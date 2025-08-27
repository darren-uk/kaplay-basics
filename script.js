// SET SCREEN DIMENSIONS
const gamePadding = 40;
let gameWidth = screen.width - gamePadding;
let gameHeight = 0;
let startPositionX = 100;
let startPositionY = 0;

if (gameWidth > 360) {
	// set width to 500px
	// set ratio to 16/9
	gameWidth = 500;
	let ratio = gameWidth / 16;
	gameHeight = ratio * 9 - gamePadding;
} else {
	// set height to 840
	gameHeight = 500 - gamePadding;
}

kaplay({
	width: gameWidth,
	height: gameHeight,
	canvas: document.querySelector("#mycanvas"),
	background: [136, 158, 189],
	gravity: 500,
});

scene("game", () => {
	setGravity(500);
	setLayers(["bg", "obj", "ui"], "obj");

	loadSprite("player", "./sprites/game-character.png");
	const player = add([
		sprite("player"),
		pos(startPositionX, startPositionY),
		area(),
		body(),
		anchor("center"),
		"player",
		{
			speed: 300,
		},
	]);

	// set controls
	function playerControls() {
		player.onKeyDown((key) => {
			if (key === "right" || key === "d") {
				player.move(player.speed, 0);
			}
			if (key === "left" || key === "a") {
				player.move(0 - player.speed, 0);
			}
			if (key === "down" || key === "s") {
				player.move(0, player.speed);
			}
			if (key === "up" || key === "w") {
				player.move(0, 0 - player.speed * 2);
			}
		});
	}
	playerControls();

	// SET CAMERA
	player.onUpdate(() => {
		// Set the viewport center to player.pos
		// camera points to anchor point of player
		setCamPos(player.pos);

		// DESTROY player if in freefall

		if (getCamPos().y > 2000) {
			//camera flashes red
			camFlash(rgb(255, 0, 0), 0.3);
			//camera shakes
			shake(30);
			//return player to original position
			player.pos = vec2(startPositionX, startPositionY);
		}
	});
	player.onPhysicsResolve(() => {
		setCamPos(player.pos);
	});

	// ADD LEVEL
	addLevel(
		[
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"   zzzz        zzz  ",
			"                    ",
			"                    ",
			"                    ",
			"                    ",
			"x                  x",
			"xxxxxxxxxx     xxxxx",
			"xxxxxxxxxxxxxxxxxxxx",
		],
		{
			tileWidth: 32,
			tileHeight: 32,
			tiles: {
				// "p": () => [sprite("player"), area(), body()],
				"x": () => [
					rect(32, 32),
					opacity(1),
					color("#2b7a2b"),
					area(),
					body({ isStatic: true }),
					// platformEffector(),
					"ground",
				],
				"z": () => [
					rect(32, 10),
					opacity(0.2),
					area(),
					body({ isStatic: true }),
					// platformEffector(),
					"platform",
				],
			},
		}
	);
});

go("game");
