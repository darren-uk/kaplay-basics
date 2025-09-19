kaplay({
	canvas: document.querySelector("#mycanvas"),
	background: [76, 133, 185],
});

scene("game", () => {
	setGravity(500);
	setLayers(["bg", "obj", "ui"], "obj");

	// ADD LEVEL
	async function main() {
		const mapData = await (await fetch("./assets/map.json")).json();

		// SCENE GLOBAL VARIABLES
		let startPositionX = 0;
		let startPositionY = 0;

		// LOAD SPRITES
		loadSprite("player", "./sprites/player1.png");
		loadSprite("map", "./assets/map-transparent.png");

		// ADD MAP SPRITE BEFORE LOADING COLLIDERS
		const map = add([sprite("map"), pos(0, 0), "map"]);

		// LOAD COLLIDERS
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

		// ADD PLAYER SPRITE AFTER LOADING COLLIDERS FOR START POSITIONS TO LOAD

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

		// SET CONTROLS
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

		// LOGIC AT EVERY PLAYER FRAME UPDATE

		player.onUpdate(() => {
			// SET CAMERA TO ANCHOR POINT OF PLAYER POSITION
			setCamPos(player.pos);
			setCamScale(2);

			// DESTROY PLAYER IF IN FREEFALL
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
	}

	main();
}); // END OF SCENE

go("game");
