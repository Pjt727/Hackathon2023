class Player {
    constructor(x, y, imageSrc, canvas) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.onload = () => {
          this.image.width = 50;
          this.image.height = 50;
        };
        this.image.src = imageSrc;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.moveSpeed = 5;
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, 50, 50);
    }
  
    moveUp() {
      if (this.y > 0) {
        this.y -= this.moveSpeed;
      }
    }
  
    moveDown() {
      if (this.y < this.canvas.height - this.image.height) {
        this.y += this.moveSpeed;
      }
    }
  
    moveLeft() {
      if (this.x > 0) {
        this.x -= this.moveSpeed;
      }
    }
  
    moveRight() {
      if (this.x < this.canvas.width - this.image.width) {
        this.x += this.moveSpeed;
      }
    }
  }

const canvas = document.getElementById('myCanvas');
const player = new Player(0, 0, '/static/game_assets/square.png', canvas);
let pressedKeys = {};


function gameLoop() {
  // Clear the canvas before drawing the player
  player.ctx.clearRect(0, 0, canvas.width, canvas.height);

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
