/**
 * Small enemies
 * 
 * @param {NPCMovement} movement the movement for the npc
 * @param {number} 
 * @param {number} damage the amount of lives taken  
 */

class GruntEnemy {
    static enemies = new Set();
    constructor(movement, damage = 1) {
        this.movement = movement;
        this.damage = damage

    }
}