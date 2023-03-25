//Creates background
const canvas = document.getElementById('myCanvas');
//puts player on screen
const player = new Player(450, 450, '/static/game_assets/MainCharacter.png', canvas);
//puts enemy on screen
const enemy = new Enemy(0, 0, '/static/game_assets/Enemy.png', canvas);
const context = canvas.getContext('2d');

const base_image = new Image();
base_image.src = canvas.getAttribute("image");
base_image.onload = function() {
  context.drawImage(base_image, 0, 0)
}

let pressedKeys = {};


function gameLoop() {
  // Clear the canvas before drawing the player
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(base_image, 0, 0, 500, 500);

  // Move the player based on which arrow key is pressed
  if (keys['ArrowUp']) {
    player.moveUp();
  }
  if (keys['ArrowDown']) {
    player.moveDown();
  }
  if (keys['ArrowLeft']) {
    player.moveLeft();
  }
  if (keys['ArrowRight']) {
    player.moveRight();
  }

  // Draw the player at its new position
  player.draw();

  //Draw the enemy at its new position
  enemy.move();
  enemy.draw()

  // Request another animation frame to continue the game loop
  window.requestAnimationFrame(gameLoop);
}

// Listen for key presses and update the `keys` object
const keys = {};
document.addEventListener('keydown', (event) => {
    console.log("the");
  keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});


// Start the game loop
window.requestAnimationFrame(gameLoop);