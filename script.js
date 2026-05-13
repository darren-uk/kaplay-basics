kaplay({
	global: true,
	width: 640,
	height: 640,
	canvas: document.querySelector("#canvas"),
	background: [198, 247, 246],
});

// ADD LEVEL
async function main() {
	const mapData = await (await fetch("./map.json")).json();
	console.log("map loaded");

	//load sprites
	loadSprite("map", "./sprites/level-bg-transparent.png");
	loadSprite("player", "./sprites/player.png");
	loadSprite("enemy", "./sprites/enemy.png");

	// ADD MAP SPRITE BEFORE LOADING COLLIDERS
	const map = add([sprite("map"), pos(0, 0), "map"]);

	// LOAD COLLIDERS

	for (const layer of mapData.layers) {
		if (layer.type === "tilelayer") continue;

		if (layer.name === "walls") {
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
		area(),
		body(),
		pos(128, 448),
		"player",
		{ speed: 300 },
	]);

	const enemy = add([
		sprite("enemy"),
		area(),
		body(),
		pos(512, 448),
		"enemy",
		{ speed: 200 },
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
				player.move(0, 0 - player.speed);
			}
		});
	}
	playerControls();
}
main();
