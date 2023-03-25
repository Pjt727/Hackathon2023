//Creates background
const canvas = document.getElementById('myCanvas');
//puts player on screen
const player = new Player(450, 450, '/static/game_assets/MainCharacter.png', canvas);
//puts enemy on screen
const enemyList = [];
enemyList.push(new Enemy(0, 0, '/static/game_assets/Enemy.png', canvas));
enemyList.push(new FollowingEnemy(0, 100, '/static/game_assets/Dog.png', canvas));
enemyList.push(new Boss(100, 100, '/static/game_assets/Boss.png', canvas));
console.log(enemyList);
const context = canvas.getContext('2d');
let canCollideEnemy = true;

let lives = 3;
const itemList = [];


const base_image = new Image();
base_image.src = canvas.getAttribute("image");
base_image.onload = function() {
  context.drawImage(base_image, 0, 0)
}

const player_hurt = new Image();
player_hurt.src = '/static/game_assets/MainCharacterHurt.png';
player_hurt.onload = function(x, y) {
  context.drawImage(player_hurt, x, y)
}

let pressedKeys = {};


function gameLoop() {
  if((Math.floor(Math.random() * 10000)) == 69){
    itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas));
  }

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
  if(!canCollideEnemy){
    context.drawImage(player_hurt, player.x, player.y, 50, 50);
  }
  
  if(canCollideEnemy && detectEnemyCollision(player, enemyList)){
    console.log("COLLIDED!!!!");
    canCollideEnemy = false;
    setTimeout( ()=>canCollideEnemy=true, 1000);
    lives--;
  }

  //Draw the enemy at its new position
  for(let i=0; i < enemyList.length; i++){
    enemyList[i].move();
    enemyList[i].draw();
  }

  // hearts
  let check = detectItemCollision(player, itemList);
  if(check >= 0){
    console.log("Life Gain");
    itemList.pop(check);
    lives++;
  }

  for(let i=0; i < itemList.length; i++){
    itemList[i].move();
    itemList[i].draw();
  }

  // Request another animation frame to continue the game loop
  window.requestAnimationFrame(gameLoop);
}

// Listen for key presses and update the `keys` object
const keys = {};
document.addEventListener('keydown', (event) => {
  keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});


// Start the game loop
window.requestAnimationFrame(gameLoop);