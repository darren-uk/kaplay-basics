// SET SCREEN DIMENSIONS
const gamePadding = 40;
let gameWidth = screen.width - gamePadding;
let gameHeight = 0;
let startPositionX = 150;
let startPositionY = -50;

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
	// width: 480,
	// height: 320,
	canvas: document.querySelector("#mycanvas"),
	background: [76, 133, 185],
});

scene("game", () => {
	setGravity(500);
	setLayers(["bg", "obj", "ui"], "obj");

	loadSprite("player", "./sprites/player1.png");
	loadSprite("map", "./assets/map-transparent.png");

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
	const map = add([sprite("map"), pos(0, 0), "map"]);

	// ADD LEVEL
	async function main() {
		const mapData = await (await fetch("./assets/map.json")).json();

		for (const layer of mapData.layers) {
			if (layer.type === "tilelayer") continue;

			if (layer.name === "positions") {
				for (const object of layer.objects) {
					startPositionX = object.x;
					startPositionY = object.y;
				}
				continue;
			}

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
	}

	main();

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
		setCamScale(2);

		// DESTROY player if in freefall

		if (getCamPos().y > 2000) {
			//camera flashes red
			flash(rgb(255, 0, 0), 0.3);
			//camera shakes
			shake(30);
			//return player to original position
			player.pos = vec2(startPositionX, startPositionY);
		}
	});
	player.onPhysicsResolve(() => {
		setCamPos(player.pos);
	});

	// Allow Passthrough

	// player.onCollide("platform", (p) => {
	// 	// If player is jumping set platform to allow passthrough
	// 	if (player.vel.y > 0) {
	// 		p.unuse("body");
	// 		// wait and set platform to disallow passthrough
	// 		wait(0.1, () => {
	// 			p.use(body({ isStatic: true }));
	// 		});
	// 	}
	// });
});

go("game");
