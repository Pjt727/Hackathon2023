/**
 * Small enemies
 * 
 * @param {NPCMovement} movement the movement for the npc
 * @param {number} damage the amount of lives taken  
 */
class GruntEnemy {
    static enemies = new Set();
    constructor(movement, damage = 1) {
        this.movement = movement;
        this.damage = damage;
        GruntEnemy.enemies.add(this);
    }

    cleanup(){
        GruntEnemy.enemies.remove(this);
    }
}

/**
 * Moving Hearts
 * 
 * @param {NPCMovement} movement the movement for the npc
 */
class Heart {
    static hearts = new Set();
    constructor(movement){
        this.movement = movement
    }
    cleanup(){
        Item.enemies.remove(this);
    }
}