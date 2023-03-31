
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
    constructor(entity_display, seed, patterns, stayInCanvas=true) {
        this.entity_display = entity_display;
        this.seed = seed
        this.patterns = patterns;
        this.curPattern;
        this.stayInCanvas = stayInCanvas;
    }

    assignRandomPattern() {
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

    doPattern(){
        [dx, dy] = this.curPattern();
        // don't do any bound checking
        if(!this.stayInCanvas){
            this.entity_display.x += dx;
            this.entity_display.y += dy;
            return;
        }

        // between the x bounds
        if((this.entity_display.x >= 0) && 
            ((this.entity_display.x + this.entity_display.image.width) <= this.entity_display.canvas.width)){
                this.entity_display.x += dx;
            }
        // move the display to the very edge
        else if(this.entity_display.x + dx < 0){
            this.entity_display.x = 0;
        }
        else{
            this.entity_display.x = this.entity_display.image.width;
        }
        
        // between the y bounds
        if((this.entity_display.y >= 0) && 
        ((this.entity_display.y + this.entity_display.image.height) <= this.entity_display.canvas.height)){
            this.entity_display.y += dy;
        }
        // move the display to the very edge
        else if(this.entity_display.y + dy < 0){
            this.entity_display.y = 0;
        }
        else{
            this.entity_display.y = this.entity_display.image.height;
        }
    }
}


// for the patterns "this" is the NPCMovement instance
let knightPatterns = (
    // moving right
    () => {
        const dx = 3;
        const dy = 0;
        return (dx, dy)
    },
    //moving left
    () => {
        const dx = -3;
        const dy = 0;
        return (dx, dy)
    },
    //moving up
    () => {
        const dx = 0;
        const dy = 3;
        return (dx, dy)
    },
    //moving down
    () => {
        const dx = 0;
        const dy = -3;
        return (dx, dy)
    }
)

let foxPatterns = (
    // following player
    () => {
        const toPlayerX = player.x - this.entity_display.x;
        const toPlayerY = player.y - this.entity_display.y;
        const distance = Math.sqrt(toPlayerX * toPlayerX + toPlayerY * toPlayerY);
        const speedFactor = 2.5 / distance;
        
        return (toPlayerX*speedFactor, toPlayerY*speedFactor)
    }
)