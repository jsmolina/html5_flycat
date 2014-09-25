var ENEMY = 1;
var FISH = 2;
var RAT = 3;

var Pill = function (ctx, jumpsX, jumpsY, pillPosX, pillPosY, type, spriteImg) {
    var pillWidth = 0;
    var pillHeight = 0;
    var pillLoaded = false;   
    var inst = this;

    this.construct = function() {
        // 75% of probability of being a pill               
        this.loadPill();
    }


    this.loadPill = function () {
        pillWidth = spriteImg.width,
        pillHeight = spriteImg.height;
        pillLoaded = true;
    };

    this.isPill = function() {
        return type;
    }

    this.isCollision = function(heroPosX, heroPosY) {
        /* @todo check why it is colliding before touching*/
        var dposX = Math.abs(pillPosX - heroPosX);
        if (dposX < jumpsX / 40 && heroPosY == pillPosY) {
            return true;
        } else {
            return false;
        }

    }

    this.render = function(counter, hero) {
        var time = +new Date();
        if (pillLoaded) {
            
            pillPosX = pillPosX - 0.5;
            if (pillPosX == 0) {
                return false;
            }
           
            var pillCounter = counter % 2;
            ctx.drawImage(spriteImg, 64*pillCounter, 0, 64, 64, pillPosX * jumpsX, pillPosY * jumpsY, 64, 64);

            if (this.isCollision(hero.getPosX(), hero.getPosY())) {
                if (type == FISH) {
                    hero.score(10);
                } else if(type == RAT) {
                    hero.score(20);
                } else {                    
                    hero.fight();
                }
                return false;
            }
        }
        return true;
    }
};

var PillFactory = function(ctx, jumpsX, jumpsY) {
    var spriteImgPill = new Image();

    spriteImgPill.src = "images/pill.png";
    var spriteImgPoint = new Image();
    spriteImgPoint.src = "images/point.png";
    var spriteEnemy = new Image();
    spriteEnemy.src = "images/enemy1.png";


    this.giveMeOne = function() {
        // 10 Y and 40 X
        var posX = Math.floor((Math.random()*40)+1);
        var posY = Math.floor((Math.random()*10)+1);
        var type = Math.floor((Math.random()*3)+1);
        //var type = RAT;
        
        /*var isRat = rnd > 75;
        var isEnemy = rnd < 60;*/
        var spriteImg = null;
        if (type == RAT) {
            spriteImg = spriteImgPill;
            type = RAT;
        } else if (type == ENEMY) {
            spriteImg = spriteEnemy;
            type = ENEMY;
        } else{
            spriteImg = spriteImgPoint;
            type = FISH;
        }
        var pill = new Pill(ctx, jumpsX, jumpsY, posX, posY, type, spriteImg);
        pill.construct();
        return pill;
    }
    
}