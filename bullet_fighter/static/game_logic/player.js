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
