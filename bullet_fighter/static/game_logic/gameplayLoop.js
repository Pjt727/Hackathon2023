class Game {
    constructor(){
        //Creates background
        this.seed = 10;
        this.canvas = document.getElementById('myCanvas');
        this.timer = document.getElementById('timer');
        timer.innerHTML = "0:00"
        //puts player on screen
        const player_entity_display = new EntityDisplay(450, 450, '/static/game_assets/MainCharacter.png', this.canvas, 50,50);
        this.player = new Player(player_entity_display);
        
        this.context = canvas.getContext('2d');

        const base_image = new Image();
        base_image.src = canvas.getAttribute("image");
        base_image.onload = function() {
            context.drawImage(base_image, 0, 0)
        }

        this.player_hurt_src = '/static/game_assets/MainCharacterHurt.png';
    }

    startGame(){
        enemyList.push(new Enemy(0, 0, '/static/game_assets/Enemy.png', canvas));
        setTimeout(() => enemyList.push(new FollowingEnemy(0, 100, '/static/game_assets/Dog.png', canvas)), 15000);
        setTimeout(() => enemyList.push(new Fox(100, 100, '/static/game_assets/Fox.png', canvas)), 30000);
        setTimeout(() => enemyList.push(new Boss(0, 0, '/static/game_assets/BossNew.png', canvas)), 45000);

        this.heartInterval = setInterval(() => this.makeHeart(), 10000);

        window.requestAnimationFrame(this.gameLoop);
    }

    makeHeart(){
        let entity_display = new EntityDisplay(
            this.canvas.width/2,
            this.canvas.height/2,
            '/static/game_assets/Heart.png',
            this.canvas,
            50, 50)
        let npc_patterns = new NPCMovement(entity_display, this.seed, randomDirection);
        new Heart(npc_patterns);
    }

    makeGrunt(x, y, src, width, height, patterns){
        let entity_display = new EntityDisplay(x,y, src, this.canvas, width, height);
        let npc_patterns = new NPCMovement(entity_display, this.seed, patterns)
        new GruntEnemy(npc_patterns);
    }

    gameLoop(){
        let newNow = new Date();
        let diffOfSeconds = Math.floor((newNow.getTime() - now.getTime()) / 1000);
        timer.innerHTML = Math.floor(diffOfSeconds / 60) + ":" + (('0' + (diffOfSeconds % 60)).slice(-2))
        if (lives == 0) {
            return;
        }
        
        if ((Math.floor(Math.random() * 5000)) == 69) {
            itemList.push(new Heart(225, 225, '/static/game_assets/Heart.png', canvas));
        }
        
        // Clear the canvas before drawing the player
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
        
        
        
        // Draw the player at its new position
        player.draw();
        if (!canCollideEnemy) {
            context.drawImage(player_hurt, player.x, player.y, 50, 50);
        }
        
        if (canCollideEnemy && detectEnemyCollision(player, enemyList)) {
            console.log("COLLIDED!!!!");
            canCollideEnemy = false;
            setTimeout(() => canCollideEnemy = true, 1000);
            document.getElementById("life" + lives).remove();
            lives--;
        }
        
        //Draw the enemy at its new position
        for (let i = 0; i < enemyList.length; i++) {
            enemyList[i].move();
            enemyList[i].draw();
        }
        
        // hearts
        let check = detectItemCollision(player, itemList);
        if (check >= 0) {
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
        
        for (let i = 0; i < itemList.length; i++) {
            itemList[i].move();
            itemList[i].draw();
        }
        
        // Request another animation frame to continue the game loop
        window.requestAnimationFrame(this.gameLoop);
    }
} 
