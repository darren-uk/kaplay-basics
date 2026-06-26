kaplay({
	global: true,
	width: 640,
	height: 640,
	canvas: document.querySelector("#canvas"),
	background: [198, 247, 246],
});

// ADD LEVEL
async function main() {
	const mapData = await (await fetch("./map03.json")).json();
	console.log("map loaded");

	//load sprites
	loadSprite("map", "./sprites/level-bg-transparent.png");
	loadSprite("player", "./sprites/player.png");
	loadSprite("enemy", "./sprites/enemy.png");

	// ADD MAP SPRITE BEFORE LOADING COLLIDERS
	const map = add([sprite("map"), pos(0, 0), "map"]);

	// LOAD COLLIDERS

	const nav = new NavMesh();

	for (const layer of mapData.layers) {
		if (layer.type === "tilelayer") continue;

		if (layer.name === "walls") {
			for (const object of layer.objects) {
				const collider = add([
					rect(object.width, object.height),
					pos(object.x, object.y),
					area(),
					body({ isStatic: true }),
					color(RED),
					opacity(0.2),
					"wall",
				]);
			}
			continue;
		}

		// ENEMY WORKS WITHOUT POLYGONS ??
		if (layer.name === "path") {
			for (const object of layer.objects) {
				// Add polygons for navmesh
				nav.addPolygon([
					vec2(object.x, object.y),
					vec2(object.x + object.width, object.y),
					vec2(object.x + object.width, object.y + object.height),
					vec2(object.x, object.y + object.height),
				]);

				// add visual reference
				const pathshow = map.add([
					rect(object.width, object.height),
					pos(object.x, object.y),
					color(GREEN),
					opacity(0.5),
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
		anchor(vec2(0, 0)), // PLAYER MUST HAVE ANCHOR FOR ENEMY TO CONNECT PATH TO
		pos(128, 448),
		"player",
		{ speed: 200 },
	]);

	//spawn enemy

	// const enemy = add([
	// 	sprite("enemy"),
	// 	area(),
	// 	body(),
	// 	pos(512, 448),
	// 	"enemy",
	// 	{ speed: 200 },
	// ]);

	function addEnemy(p) {
		const enemy = add([
			{
				add() {
					this.onObjectsSpotted((objects) => {
						const playerSeen = objects.some((o) => o.is("player"));
						if (playerSeen) {
							enemy.action = "pursuit";
							enemy.waypoints = null;
						}
					});
					this.onPatrolFinished(() => {
						enemy.action = "observe";
					});
				},
			},
			pos(p),
			sprite("enemy"),
			anchor(vec2(0, 0)),
			area(),
			body(),
			sentry(
				{ include: ["player"] },
				{
					lineOfSight: true,
					raycastExclude: ["enemy"],
					raycastInclude: ["wall"],
				},
			),
			patrol({ speed: 100 }),
			pathfinder({
				graph: nav,
				navigationOpt: {
					type: "edges",
				},
			}),
			"enemy",
			{ action: "observing", waypoint: null },
		]);
		return enemy;
	}

	addEnemy(vec2(512, 448));

	let path;
	let lastPos;

	onUpdate("enemy", (enemy) => {
		switch (enemy.action) {
			case "observe": {
				break;
			}
			case "pursuit": {
				if (enemy.hasLineOfSight(player)) {
					// We can see the player, just go straight to their location
					enemy.moveTo(player.pos, 200);
					console.log("I can see you!");
					lastPos = player.pos;
				} else {
					enemy.moveTo(lastPos, 200);
					// // We can't see the player, but we know where they are, plot a path
					path = enemy.navigateTo(player.pos);
					// console.log("I will find where you were");
					// // enemy.waypoint = path[1];

					if (path) {
						enemy.waypoints = path;

						console.log("On patrol");
					}
					// console.log(path);
					// enemy.action = "observe";
				}
				break;
			}
		}
	});

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
