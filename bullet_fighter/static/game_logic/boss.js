class Boss {
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
        this.moveSpeed = 4;
        this.distanceMoved = 0;
        this.direction = 1; // Direction of movement: 1 = right, 2 = down, 3 = left, 4 = up
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, 200, 200);
    }

    move() {
      // Move the enemy in the current direction
      switch (this.direction) {
        case 1: // Move right
          if (this.x < this.canvas.width - 250) {
            this.x += this.moveSpeed;
            this.distanceMoved += this.moveSpeed;
          } else {
            this.direction = 3; // Change direction to left
          }
          break;
        case 2: // Move down
          if (this.y < this.canvas.height - 250) {
            this.y += this.moveSpeed;
            this.distanceMoved += this.moveSpeed;
          } else {
            this.direction = 4; // Change direction to up
          }
          break;
        case 3: // Move left
          if (this.x > 0) {
            this.x -= this.moveSpeed;
            this.distanceMoved += this.moveSpeed;
          } else {
            this.direction = 1; // Change direction to right
          }
          break;
        case 4: // Move up
          if (this.y > 0) {
            this.y -= this.moveSpeed;
            this.distanceMoved += this.moveSpeed;
          } else {
            this.direction = 2; // Change direction to down
          }
          break;
      }
  
      // If the enemy has moved 200 pixels, change direction
      if (this.distanceMoved >= 300) {
        this.direction = Math.floor(Math.random() * 4) + 1;
        this.distanceMoved = 0;
      }
    }
}