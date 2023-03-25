class Fox {
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
        this.moveSpeed = 2.5;
        this.player = player; 
        
    }
  
    draw() {
      this.ctx.drawImage(this.image, this.x, this.y, 50, 50);
    }

    move() {
      const dx = this.player.x - this.x;
      const dy = this.player.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speedFactor = this.moveSpeed / distance;
      this.x += dx * speedFactor;
      this.y += dy * speedFactor;
    }

}