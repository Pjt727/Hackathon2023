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


/**
 * Constructs a new NPCMovement instance.
 *
 * @param {EntityDisplay} entity_display - The entity display object.
 * @param {number} seed - The seed value to use for generating random patterns.
 * @param {Array<function>} patterns - An array of functions that determine NPC movement.
 * Each function should take two parameters: the entity_display object and the seed value,
 * and return an array of two numbers indicating the change in the x and y directions.
 */
class NPCMovement {
    constructor(entity_display, seed, patterns) {
        this.entity_display = entity_display;
        this.seed = seed
        this.patterns = patterns;
        this.curPattern;
    }

    assignsRandomPattern() {
        const a = 1664525;
        const c = 1013904223;
        const m = 4294967296;
        let x = this.seed;

        // Generate the next pseudorandom number
        x = (a * x + c) % m;

        this.seed = x; // changing the seed for the next time
        // Map the number to the int range [0, this.patterns.length) 
        const range = this.patterns.length + 1;
        const randomInt = Math.floor((x / m) * range);

        this.curPattern = this.patterns[randomInt];
    }
}