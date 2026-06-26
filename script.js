kaplay({
	global: true,
	width: 736,
	height: 480,
	canvas: document.querySelector("#canvas"),
	background: [198, 247, 246],
});

scene("game", () => {
	//load sprites
	loadSprite("player", "./sprites/player.png");
	loadSprite("enemy", "./sprites/enemy.png");

	// ADD LEVEL
	async function main() {
		const mapData = await (await fetch("./map-maze.json")).json();
		console.log("map loaded");

		// ADD MAP SPRITE BEFORE LOADING COLLIDERS
		const map = add([
			rect(width(), height()),
			pos(0, 0),
			color(0, 0, 0),
			"map",
		]);

		// LOAD COLLIDERS

		const nav = new NavMesh();

		for (const layerData of mapData.layers) {
			if (layerData.type === "tilelayer") continue;

			if (layerData.name === "walls") {
				for (const object of layerData.objects) {
					const wall = map.add([
						rect(object.width, object.height),
						pos(object.x, object.y),
						area(),
						body({ isStatic: true }),
						color(255, 255, 0),
						opacity(1),
						"wall",
					]);
				}
				continue;
			}

			if (layerData.name === "crypts") {
				for (const object of layerData.objects) {
					const blankCrypt = map.add([
						rect(object.width, object.height),
						pos(object.x, object.y),
						area(),
						body({ isStatic: true }),
						color(255, 188, 0),
						opacity(1),
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
			anchor(vec2(0, 0)), // PLAYER MUST HAVE ANCHOR FOR ENEMY TO CONNECT PATH TO
			pos(32, 32),
			"player",
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

		// ------------ ENEMIES -------------------

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

		addEnemy(vec2(704, 448));
	}

	main();
}); //END SCENE

go("game");
