let screenWidth = window.screen.width;
let screenHeight = window.screen.height;
let padding = 28;

kaplay({
	background: [100, 100, 255], //light Blue
	width: screenWidth - padding,
	height: 600,
});

loadSprite("cat", "./sprites/kat.png");

// const PLATFORM_Y_POSITIONS = [
// 	500, //Bottom
// 	350, //Middle
// 	200, //Top
// ];
const PLATFORM_Y_POSITIONS = [
	screenHeight - 64 - screenHeight / 3, //Bottom
	screenHeight - (screenHeight / 3) * 2, //Middle
	screenHeight - (-64 + (screenHeight / 3) * 3), //Top
];

let currentPlatformIndex = 0; // start on bottom

//ADD PLAYER
const player = add([
	sprite("cat"),
	pos(50, PLATFORM_Y_POSITIONS[currentPlatformIndex]),
	area(),
	body(),
	"player",
	{
		w: 61,
		h: 58,
	},
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
			0.4, //DURATION
			(p) => (player.pos = p),
			easings.easeOutQuad
		);
	}
}

//ADD 'UP' BUTTON
const upButton = add([
	rect(100, 50),
	pos(width() - 120, PLATFORM_Y_POSITIONS[2]),
	area(),
	color(0, 200, 0), //green
	"up_button", //TAG
]);

const upText = upButton.add([
	text("UP", { size: 24 }),
	anchor("center"),
	pos(upButton.width / 2, upButton.height / 2), // relative to parent
]);

//ADD 'DOWN' BUTTON
const downButton = add([
	rect(100, 50),
	pos(width() - 120, 80 + PLATFORM_Y_POSITIONS[2]),
	area(),
	color(200, 0, 0), //red
	"down_button", //TAG
]);
const downText = downButton.add([
	text("DOWN", { size: 24 }),
	anchor("center"),
	pos(downButton.width / 2, downButton.height / 2), // relative to parent
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
