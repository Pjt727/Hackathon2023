class Collision {
    detectEnemyCollision(player, enemyList) {
        for (i = 0; i < enemyList.length(); i++) {
            if ((Math.abs(player.x - enemyList[i].x) > 5) && (Math.abs(player.x - enemyList[i].x) > 5)) {
                return true;
            }
        }
        return false;
    }

    detectItemCollision(player, itemList) {
        for (i = 0; i < itemList.length(); i++) {
            if ((Math.abs(player.x - itemList[i].x) > 5) && (Math.abs(player.x - itemList[i].x) > 5)) {
                return true;
            }
        }
        return false;
    }
    
}