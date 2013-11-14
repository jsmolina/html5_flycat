var Enemy = function (ctx, jumpsX, jumpsY) {
    var spriteEnemy1Img = new Image();
    var enemyWidth = 0;
    var enemyHeight = 0;
    var enemyLoaded = false;

    var enemyPosX = 30;
    var enemyPosY = 5;

    this.construct = function() {
        spriteEnemy1Img.src = "images/enemy1.png";

        spriteEnemy1Img.onload = this.loadEnemy1;
    }

    this.loadEnemy1 = function () {
        enemyWidth = spriteEnemy1Img.width,
        enemyHeight = spriteEnemy1Img.height;
        enemyLoaded = true;
    };

    this.render = function(counter) {
        if (enemyLoaded) {
            ctx.drawImage(spriteEnemy1Img, 64 * counter, 0, 64, 64, enemyPosX * jumpsX, enemyPosY * jumpsY, 64, 64);
        }
    }

}
