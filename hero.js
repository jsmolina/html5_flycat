var Hero = function (ctx, jumpsX, jumpsY) {
    var spriteImg = new Image();
    var spriteFight = new Image();
    var spriteLoaded = false;
    var fight = false;
    var fightStarted = 0;
    var spriteWidth = 0;
    var spriteHeight = 0;
    
    var heroPosX = 0;
    var heroPosY = 5;
    var points = 0;
    var lives = 7;

    this.construct = function() {
        spriteImg.src = "images/pacman.png";
        spriteImg.onload = this.loadSprite;

        spriteFight.src = "images/fight.png";
    }

    this.getPosX = function() {
        return heroPosX;
    }
    this.getPosY = function() {
        return heroPosY;
    }
    
    this.score = function (p) {
        points += p;
    }

    this.fight = function () {
        if (!fight) {
            fightStarted = Date.now();
            lives = lives - 1;
        }
        fight = true;        
    }

    this.getScore = function() {
        return points;
    }

    this.getLives = function() {
        return lives;
    }

    this.render = function(counter) {
        if (spriteLoaded) {
            if (!fight) {
                ctx.drawImage(spriteImg, 64 * counter, 0, 64, 64, heroPosX * jumpsX, heroPosY * jumpsY, 64, 64);
            } else {
                var now = Date.now();
                if (now - fightStarted > 1000) {
                    fight = false;
                }
                ctx.drawImage(spriteFight, 64 * counter, 0, 64, 64, heroPosX * jumpsX, heroPosY * jumpsY, 64, 64);
            }
        }
    }

    this.loadSprite = function () {
        spriteLoaded = true;
        spriteWidth = spriteImg.width,
        spriteHeight = spriteImg.height;
    };


    this.heroLeft = function () {
        if (fight) {
            return;
        }
        heroPosX -= 1;

        if (heroPosX < 0) {
            heroPosX = 0;
        }
    };

    this.heroRight = function () {
        if (fight) {
            return;
        }
        heroPosX += 1;

        if (heroPosX > 40) {
            heroPosX = 40;
        }
    };

    this.heroUp = function () {
        if (fight) {
            return;
        }
        heroPosY -= 1;

        if (heroPosY < 0) {
            heroPosY = 0;
        }
    };

    this.heroDown = function () {
        if (fight) {
            return;
        }
        heroPosY += 1;

        if (heroPosY > 10) {
            heroPosY = 10;
        }
    };
}
