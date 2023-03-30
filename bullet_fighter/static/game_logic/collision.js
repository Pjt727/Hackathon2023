function detectEnemyCollision(player, enemyList) {
    for (let i = 0; i < enemyList.length; i++) {
        if (((enemyList[i].x <= player.x && player.x <= enemyList[i].x + enemyList[i].image.width) && (enemyList[i].y <= player.y && player.y <= enemyList[i].y + enemyList[i].image.height)) || // corner one
            ((enemyList[i].x <= player.x && player.x <= enemyList[i].x + enemyList[i].image.width) && (enemyList[i].y <= player.y + player.image.height && player.y + player.image.height <= enemyList[i].y + enemyList[i].image.height)) || // corner two
            ((enemyList[i].x <= player.x + player.image.width && player.x + player.image.width <= enemyList[i].x + enemyList[i].image.width) && (enemyList[i].y <= player.y && player.y <= enemyList[i].y + enemyList[i].image.height)) || // corner three
            ((enemyList[i].x <= player.x + player.image.width && player.x + player.image.width <= enemyList[i].x + enemyList[i].image.width) && (enemyList[i].y <= player.y + player.image.height && player.y + player.image.height <= enemyList[i].y + enemyList[i].image.height))) // corner four
        {
            return true;
        }
    }
    return false;
}

function detectItemCollision(player, itemList) {
    for (let i = 0; i < itemList.length; i++) {
        if (((itemList[i].x <= player.x && player.x <= itemList[i].x + itemList[i].image.width) && (itemList[i].y <= player.y && player.y <= itemList[i].y + itemList[i].image.height)) || // corner one
            ((itemList[i].x <= player.x && player.x <= itemList[i].x + itemList[i].image.width) && (itemList[i].y <= player.y + player.image.height && player.y + player.image.height <= itemList[i].y + itemList[i].image.height)) || // corner two
            ((itemList[i].x <= player.x + player.image.width && player.x + player.image.width <= itemList[i].x + itemList[i].image.width) && (itemList[i].y <= player.y && player.y <= itemList[i].y + itemList[i].image.height)) || // corner three
            ((itemList[i].x <= player.x + player.image.width && player.x + player.image.width <= itemList[i].x + itemList[i].image.width) && (itemList[i].y <= player.y + player.image.height && player.y + player.image.height <= itemList[i].y + itemList[i].image.height))) // corner four
        {
            return i;
        }
    }
    return -1;
}

function detectCollision(entity1, entity2) {
    // getting the corners of the first entity
    let entity1x1 = entity1.x;
    let entity1x2 = entity1.x + entity1.image.width;
    let entity1y1 = entity1.y;
    let entity1y2 = entity1.y + entity1.image.height;

    // getting the corners of the second entity
    let entity2x1 = entity2.x;
    let entity2x2 = entity2.x + entity2.image.width;
    let entity2y1 = entity2.y;
    let entity2y2 = entity2.y + entity2.image.height;

    // checking to seeing the resulting rectangles overlap
    // x ranges intersect and y ranges intersect
    if ((entity1x1 <= entity2x2 && entity1x2 >= entity2x1) && (entity1y1 <= entity2y2 && entity1y2 >= entity2y1)) {
        return true;
    }
    return false;
}