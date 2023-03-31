/**
 * Constructs a new EntityDisplay instance.
 * 
 * @param x starting x of the entity
 * @param y starting y of the entity
 * @param imageSrc source of the image
 * @param canvas canvas element
 * @param width in px of the image
 * @param height in px of the image
 */
class EntityDisplay {
    constructor(x, y, imageSrc, canvas, width, height) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
        this.image.onload = () => {
            this.image.width = width;
            this.image.height = height;
        }
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}
