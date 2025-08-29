// SET SCREEN DIMENSIONS
const gamePadding = 40;
let gameWidth = screen.width;
// let gameHeight = 0;
let gameHeight = screen.height;
let startPositionX = 100;
let startPositionY = 50;

// if (gameWidth > 300) {
// 	// set width to 500px
// 	// set ratio to 16/9
// 	gameWidth = 500;
// 	let ratio = gameWidth / 16;
// 	gameHeight = ratio * 9 - gamePadding;
// } else {
// 	// set height to 840
// 	// gameHeight = 500 - gamePadding;
// 	gameHeight = screen.height - gamePadding;
// }

kaplay({
	width: gameWidth,
	height: gameHeight,
	canvas: document.querySelector("#mycanvas"),
	background: [136, 158, 189],
});

scene("game", () => {
	setLayers(["bg", "obj", "ui", "controls"], "obj");

	loadSprite("player", "./sprites/game-character.png");
	const player = add([
		sprite("player"),
		pos(startPositionX, startPositionY),
		scale(0.5),
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

		// TOUCH CONTROLS

		const touchButtonLeft = document.getElementById("btn-left");
		const touchButtonRight = document.getElementById("btn-right");
		const touchButtonUp = document.getElementById("btn-up");
		const touchButtonDown = document.getElementById("btn-down");

		let movementDirection = { x: 0, y: 0 };

		function setMovement(x, y) {
			movementDirection.x = x;
			movementDirection.y = y;
		}

		function stopMovement() {
			movementDirection.x = 0;
			movementDirection.y = 0;
		}

		onUpdate("player", (player) => {
			if (movementDirection.x !== 0 || movementDirection.y !== 0) {
				player.move(movementDirection.x, movementDirection.y);
				console.log("player is moving: " + movementDirection);
			}
		});

		//----------
		touchButtonLeft.addEventListener("click", () => {
			setMovement(0 - player.speed, 0);
		});
		touchButtonLeft.addEventListener("touchend", stopMovement);
		//-----------
		touchButtonRight.addEventListener("click", () =>
			setMovement(player.speed, 0)
		);
		touchButtonRight.addEventListener("touchend", stopMovement);
		//-------------
		touchButtonUp.addEventListener("click", () =>
			setMovement(0, 0 - player.speed * 2)
		);
		touchButtonUp.addEventListener("touchend", stopMovement);
		//---------------
		touchButtonDown.addEventListener("click", () =>
			setMovement(0, player.speed)
		);
		touchButtonDown.addEventListener("touchend", stopMovement);
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

	// ADD LEVEL
	addLevel(
		[
			"xxxxxxxxxxxxxxxxxxxx",
			"x                  x",
			"xxxxxxxx       xxxxx",
			"x                  x",
			"x  xxxxxxxxxxxxxxxxx",
			"x                  x",
			"xxxxxxxx    xxxxxxxx",
			"x                  x",
			"x     xxxxxxxx     x",
			"x                  x",
			"x                  x",
			"xxxxxxxxxxxxxxxxxxxx",
		],
		{
			tileWidth: 32,
			tileHeight: 32,
			tiles: {
				"x": () => [
					rect(32, 32),
					opacity(1),
					color("#2b7a2b"),
					area(),
					body({ isStatic: true }),
					"wall",
				],
			},
		}
	);
});

go("game");
