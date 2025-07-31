kaplay({
	background: [100, 100, 255], //light Blue
	width: 800,
	height: 600,
});

loadSprite("cat", "./sprites/kat.png");

const PLATFORM_Y_POSITIONS = [
	500, //Bottom
	350, //Middle
	200, //Top
];

let currentPlatformIndex = 0; // start on bottom

//ADD PLAYER
const player = add([
	sprite("cat"),
	pos(width() / 2, PLATFORM_Y_POSITIONS[currentPlatformIndex]),
	area(),
	body(),
	"player",
]);

// STAY ON SCREEN
player.onUpdate(() => {
	if (player.pos.y > height()) {
		player.pos.y = height;
	}
});

//MOVE PLAYER TO PLATFORM
function moveToPlatform(targetIndex) {
	if (targetIndex >= 0 && targetIndex < PLATFORM_Y_POSITIONS.length) {
		currentPlatformIndex = targetIndex;

		// // ANIMATE PLAYER MOVEMENT
		tween(
			player.pos, //CURRENT POSITION
			vec2(player.pos.x, PLATFORM_Y_POSITIONS[currentPlatformIndex]), // MOVE TO POSITION
			0.3, //DURATION
			(p) => (player.pos = p),
			easings.easeOutQuad
		);
	}
}

//ADD 'UP' BUTTON

const upButton = add([
	rect(100, 50),
	pos(width() - 120, 50),
	area(),
	color(0, 200, 0), //green
	"up_button", //TAG
]);

const upText = upButton.add([
	text("UP", { size: 24 }),
	pos(upButton.width / 2 - 20, upButton.height / 2 - 10), // relative to parent
]);

//ADD 'DOWN' BUTTON

const downButton = add([
	rect(100, 50),
	pos(width() - 120, 120),
	area(),
	color(200, 0, 0), //red
	"down_button", //TAG
]);
const downText = downButton.add([
	text("DOWN", { size: 24 }),
	pos(downButton.width / 2 - 20, downButton.height / 2 - 10), // relative to parent
]);

//BUTTON HANDLERS

onClick("up_button", () => {
	moveToPlatform(currentPlatformIndex + 1);
});

onClick("down_button", () => {
	moveToPlatform(currentPlatformIndex - 1);
});

// DRAW PLATFORMS

for (let i = 0; i < PLATFORM_Y_POSITIONS.length; i++) {
	add([
		rect(width(), 20),
		pos(0, PLATFORM_Y_POSITIONS[i] + (64 - 10)),
		color(100, 50, 0), // brown
		area(),
		"platform",
	]);
}
