class Player {
    constructor(entity_display, lives = 5, speed = 3) {
        this.entity_display = entity_display;

        this.lives = lives;
        this.speed = speed;
        this.keys = {};
        this.can_collide = false;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

    }

    heartDetection(){
        for(let heart of Heart.hearts){
            if(detectCollision(this.entity_display, heart.movement.entity_display)){
                heart.cleanup();
                this.lives += 1;
            }
        }
    }
    enemyDetection() {
        for (let gruntEnemy of GruntEnemy.enemies) {
            if (detectCollision(this.entity_display, gruntEnemy.movement.entity_display)) {
                this.lives -= gruntEnemy.damage;
                return;
            }
        }
    }

    handleKeyDown(event) {
        this.keys[event.code] = true;
    }

    handleKeyUp(event) {
        this.keys[event.code] = false;
    }

    move() {
        let dx = 0;
        let dy = 0;
        let diagonal_factor = 1; // no diagonal factor

        // logical xOR of right,left AND logical xOR of up,down
        if ((this.keys['ArrowLeft'] ? !this.keys['ArrowRight'] : this.keys['ArrowRight']) &&
            (this.keys['ArrowUp'] ? !this.keys['ArrowDown'] : this.keys['ArrowDown'])) {
            diagonal_factor = Math.SQRT2 / 2; // yes diagonal factor
        }
        if (this.keys['ArrowLeft']) { dx += this.speed * diagonal_factor; }
        if (this.keys['ArrowRight']) { dx -= this.speed * diagonal_factor; }
        if (this.keys['ArrowUp']) { dy += this.speed * diagonal_factor; }
        if (this.keys['ArrowDown']) { dy -= this.speed * diagonal_factor; }

        // between the x bounds
        if ((this.entity_display.x >= 0) &&
            ((this.entity_display.x + this.entity_display.image.width) <= this.entity_display.canvas.width)) {
            this.entity_display.x += dx;
        }
        // move the display to the very edge
        else if (this.entity_display.x + dx < 0) {
            this.entity_display.x = 0;
        } else {
            this.entity_display.x = this.entity_display.image.width;
        }

        // between the y bounds
        if ((this.entity_display.y >= 0) &&
            ((this.entity_display.y + this.entity_display.image.height) <= this.entity_display.canvas.height)) {
            this.entity_display.y += dy;
        }
        // move the display to the very edge
        else if (this.entity_display.y + dy < 0) {
            this.entity_display.y = 0;
        } else {
            this.entity_display.y = this.entity_display.image.height;
        }
    }

    cleanup() {
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
        document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    }
}