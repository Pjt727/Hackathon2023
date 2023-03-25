
function detectEnemyCollision(player, enemyList) {
    for (let i = 0; i < enemyList.length; i++) {
        if (((enemyList[i].x >= player.x) && (enemyList[i].x <= player.x + player.image.width)) && ((enemyList[i].y >= player.y) && (enemyList[i].y <= player.y + player.image.height))) {
            return true;
        }
    }
    return false;
}

function detectItemCollision(player, itemList) {
    for (let i = 0; i < itemList.length; i++) {
        if (((itemList[i].x >= player.x) && (itemList[i].x <= player.x + player.image.width)) && ((itemList[i].y >= player.y) && (itemList[i].y <= player.y + player.image.height))) {
            return true;
        }
    }
    return false;
}

