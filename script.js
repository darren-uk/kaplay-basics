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
	setLayers(["bg", "obj", "ui"], "obj");

	loadSprite("player", "./sprites/sheets/sonny-complete3.png", {
		sliceX: 3,
		sliceY: 3,
		anims: {
			walk: { from: 0, to: 5, loop: true },
			jump: { from: 6, to: 6, loop: false },
			crouch: { from: 7, to: 7, loop: false },
		},
	});
	loadSprite("clouds", "./sprites/sheets/clouds.png", {
		sliceX: 3,
		sliceY: 1,
		anims: {
			small: { from: 0, to: 0 },
			medium: { from: 1, to: 1 },
			large: { from: 2, to: 2 },
		},
	});
	loadSprite("grass", "./sprites/assets/grass2.png");
	loadSprite("bush", "./sprites/assets/bush2.png");
	loadSprite("house", "./sprites/assets/house.png");
	loadSprite("bird", "./sprites/assets/bird.png");

	loadSound("music", "./sounds/loop-music01.mp3");
	loadSound("purr", "./sounds/cat-purr.mp3");
	loadSound("pigeon", "./sounds/pigeon01.mp3");
	let musicPlaying = false;
	let music;

	document.addEventListener("keydown", () => {
		if (musicPlaying == true) {
		} else {
			musicPlaying = true;
			music = play("music", { volume: 0.8, speed: 1, loop: true });
		}
	});

	const score = add([text("score: 0"), pos(24, 24), layer("ui"), { value: 0 }]);
	const level = add([text("level: 1"), pos(24, 52), layer("ui"), { value: 1 }]);

	//cloud animations
	let cloudName = "";
	function cloudType() {
		const names = ["small", "medium", "large"];
		cloudName = names[Math.floor(Math.random() * 3)];
		return cloudName;
	}
	//wait 4secs and loop
	loop(4, () => {
		// let cloudSpeed = Math.floor(Math.random() * max) + min;
		let cloudSpeed = Math.floor(Math.random() * 15) + 5;
		let cloudHeight = Math.floor(Math.random() * 80) + -30;
		const cloud = add([
			sprite("clouds"),
			layer("bg"),
			// pos(650, rand(80)),
			pos(650, cloudHeight),
			area(),
			{
				dir: LEFT,
				speed: cloudSpeed,
			},
		]);
		cloud.play(cloudType());
		// change scale of clouds
		if (cloudName == "large") {
			cloud.scale = 2.1;
		}
		if (cloudName == "medium") {
			cloud.scale = 1.2;
		}
		// destroy clouds when off edge of screen
		cloud.onUpdate(() => {
			cloud.move(cloud.dir.scale(cloud.speed));
			if (cloud.pos.x < -60) {
				destroy(cloud);
			}
		});
	});

	const house = add([sprite("house"), pos(0, -10), area()]);
	const bush1 = add([sprite("bush"), pos(200, 30), area()]);
	const bush2 = add([sprite("bush"), pos(-180, 30), area()]);

	let birdRate = 5;
	let birdSpeed = 120;
	// wait 2 secs

	loop(birdRate, () => {
		if (level.value == 1) {
			let birdHeight = Math.floor(Math.random() * 300) + -30;
			const bird = add([
				sprite("bird"),
				layer("obj"),
				pos(650, birdHeight),
				move(LEFT, birdSpeed),
				area(),
				"enemy",
			]);
			bird.onUpdate(() => {
				if (bird.pos.x < -60) {
					destroy(bird);
				}
				bird.onCollide("ground", (b) => {
					destroy(bird);
				});
			});
		} else {
			return;
		}
	});

	const player = add([
		sprite("player"),
		pos(50, 50),
		body(),
		area({
			shape: new Rect(vec2(0, 24), 64, 40),
		}),
		layer("obj"),
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
			"   zzzz        zzz  ",
			"                    ",
			"                    ",
			"xxxxxxxxxx     xxxxx",
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

	// ----------------------------------------------

	// key presses
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
			// meow = play("meow", { volume: 0.3, speed: 0.9, loop: false });
		}
		if (key === "down" || key === "s") {
			player.play("crouch");
			purr = play("purr", { volume: 1, loop: false });
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
			purr.stop();
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

	player.onCollide("enemy", (e) => {
		e.use(body());
		pigeon = play("pigeon", { volume: 1, speed: 1.1, loop: false });
		score.value += 1;
		score.text = "Score:" + score.value;
		// stops repeat collisions of same enemy
		e.untag("enemy");
	});

	// Allow passthrough
	player.onCollide("platform", (p) => {
		// Only allow collision if player is falling and above the platform
		if (player.vel.y > 0) {
			// Valid landing — do nothing, collision resolves
			p.unuse("body");
			wait(0.1, () => {
				p.use(body({ isStatic: true }));
			});
			console.log("lower");
		}
	});

	// SET LEVELS
	// change birdRate = 5
	// change birdSpeed = 120
	// update level number
	wait(15, () => {
		// level 2
		birdRate = 4;
		birdSpeed = 180;
		level.value += 1;
		level.text = "Level:" + level.value;
		music.speed = 1.1;
		loop(birdRate, () => {
			if (level.value == 2) {
				let birdHeight = Math.floor(Math.random() * 300) + -30;
				const bird = add([
					sprite("bird"),
					layer("obj"),
					pos(650, birdHeight),
					move(LEFT, birdSpeed),
					area(),
					"enemy",
				]);
				bird.onUpdate(() => {
					if (bird.pos.x < -60) {
						destroy(bird);
					}
					bird.onCollide("ground", (b) => {
						destroy(bird);
					});
				});
			} else {
				return;
			}
		});
	});
	wait(30, () => {
		// level 3
		birdRate = 3;
		birdSpeed = 220;
		level.value += 1;
		level.text = "Level:" + level.value;
		music.speed = 1.2;
		loop(birdRate, () => {
			if (level.value == 3) {
				let birdHeight = Math.floor(Math.random() * 300) + -30;
				const bird = add([
					sprite("bird"),
					layer("obj"),
					pos(650, birdHeight),
					move(LEFT, birdSpeed),
					area(),
					"enemy",
				]);
				bird.onUpdate(() => {
					if (bird.pos.x < -60) {
						destroy(bird);
					}
					bird.onCollide("ground", (b) => {
						destroy(bird);
					});
				});
			} else {
				return;
			}
		});
	});
	wait(45, () => {
		// level 4
		birdRate = 2;
		birdSpeed = 250;
		level.value += 1;
		level.text = "Level:" + level.value;
		music.speed = 1.3;
		loop(birdRate, () => {
			if (level.value == 4) {
				let birdHeight = Math.floor(Math.random() * 300) + -30;
				const bird = add([
					sprite("bird"),
					layer("obj"),
					pos(650, birdHeight),
					move(LEFT, birdSpeed),
					area(),
					"enemy",
				]);
				bird.onUpdate(() => {
					if (bird.pos.x < -60) {
						destroy(bird);
					}
					bird.onCollide("ground", (b) => {
						destroy(bird);
					});
				});
			} else {
				return;
			}
		});
	});
	wait(60, () => {
		// level 5
		birdRate = 1;
		birdSpeed = 300;
		level.value += 1;
		level.text = "Level:" + level.value;
		music.speed = 1.5;
		loop(birdRate, () => {
			if (level.value == 5) {
				let birdHeight = Math.floor(Math.random() * 300) + -30;
				const bird = add([
					sprite("bird"),
					layer("obj"),
					pos(650, birdHeight),
					move(LEFT, birdSpeed),
					area(),
					"enemy",
				]);
				bird.onUpdate(() => {
					if (bird.pos.x < -60) {
						destroy(bird);
					}
					bird.onCollide("ground", (b) => {
						destroy(bird);
					});
				});
			} else {
				return;
			}
		});
	});
	wait(75, () => {
		// level 5
		music.stop();
		go("end", score.value);
	});
});

go("game");

scene("end", (score) => {
	const endtext = add([text("Game over, your score is " + score), pos(24, 24)]);
});
