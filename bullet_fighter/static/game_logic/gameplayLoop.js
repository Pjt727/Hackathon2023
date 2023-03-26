//Creates background
const canvas = document.getElementById('myCanvas');
const now = new Date();
const timer = document.getElementById('timer');
timer.innerHTML = "0:00"
//puts player on screen
const player = new Player(450, 450, '/static/game_assets/MainCharacter.png', canvas);
//puts enemy on screen
const enemyList = [];
enemyList.push(new Enemy(0, 0, '/static/game_assets/Enemy.png', canvas));
setTimeout( ()=> enemyList.push(new FollowingEnemy(0, 100, '/static/game_assets/Dog.png', canvas)), 15000);
setTimeout( ()=> enemyList.push(new Fox(100, 100, '/static/game_assets/Fox.png', canvas)), 30000);
setTimeout( ()=> enemyList.push(new Boss(0, 0, '/static/game_assets/BossNew.png', canvas)), 45000);
console.log(enemyList);
const context = canvas.getContext('2d');
let canCollideEnemy = true;

let lives = 6;
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

setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 10000);
setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 20000);
setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 30000);
setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 40000);
setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 50000);
setTimeout(() =>itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas)), 60000);
function gameLoop() {
  let newNow = new Date();
  let seconds = newNow.getSeconds() - now.getSeconds();
  if(seconds < 0){
    seconds = seconds + 60;
  }
  timer.innerHTML = (newNow.getMinutes() - now.getMinutes()) + ":" + (('0' + seconds).slice(-2))
  

  if((Math.floor(Math.random() * 5000)) == 69){
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
    document.getElementById("life" + lives).remove();
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
    let newParagraph = document.createElement("img");
    newParagraph.setAttribute("id", "life" + lives);
    newParagraph.setAttribute("src", "/static/game_assets/Heart.png");
    newParagraph.setAttribute("width", "50");
    newParagraph.setAttribute("height", "50");

    
    let lifeContainer = document.getElementById("lifeContainer");
    lifeContainer.appendChild(newParagraph)
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