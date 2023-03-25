class Enemy {
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

}

// const canvas1 = document.getElementById('myCanvas');
// const enemy = new Enemy(0, 0, '/static/game_assets/square.png', canvas1);