var ENEMY = 1;
var FISH = 2;
var RAT = 3;

var Pill = function () {

    var pillWidth = 0;
    var pillHeight = 0;
    var pillLoaded = false;
    var inst = this;
    var _ctx = 0;
    var _jumpsX = 0;
    var _jumpsY = 0;
    var _pillPosX = 0;
    var _pillPosY = 0;
    var _type = 0;
    var _speed = 0.5;
    var _spriteImg = null;

    this.construct = function(ctx, jumpsX, jumpsY, pillPosX, pillPosY, type, spriteImg, speed) {
        _ctx = ctx;
        _jumpsX = jumpsX;
        _jumpsY = jumpsY;
        _pillPosX = pillPosX;
        _pillPosY = pillPosY;
        _type = type;
        _spriteImg = spriteImg;
        _speed = speed;
        // 75% of probability of being a pill
        this.loadPill();

    };


    this.loadPill = function () {
        pillWidth = _spriteImg.width;
        pillHeight = _spriteImg.height;
        pillLoaded = true;
    };

    this.isPill = function () {
        return type;
    };

    this.isCollision = function (heroPosX, heroPosY) {
        /* @todo check why it is colliding before touching*/
        var dposX = Math.abs(_pillPosX - heroPosX);
        var dposY = Math.abs(_pillPosY - heroPosY);
        if (dposX < _jumpsX / 40 && dposY < _jumpsY / 40) {
            return true;
        } else {
            return false;
        }

    };

    this.render = function (counter, hero) {
        var time = +new Date();
        if (pillLoaded) {

            _pillPosX = _pillPosX - _speed;
            if (_pillPosX <= 0) {
                return false;
            }

            var pillCounter = counter % 2;
            _ctx.drawImage(_spriteImg, 64 * pillCounter, 0, 64, 64, _pillPosX * _jumpsX, _pillPosY * _jumpsY, 64, 64);

            if (this.isCollision(hero.getPosX(), hero.getPosY())) {
                if (_type == FISH) {
                    hero.score(10);
                } else if (_type == RAT) {
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

var PillFactory = function (ctx, jumpsX, jumpsY) {
    var spriteImgPill = new Image();

    spriteImgPill.src = "images/pill.png";
    var spriteImgPoint = new Image();
    spriteImgPoint.src = "images/point.png";
    var spriteEnemy = new Image();
    spriteEnemy.src = "images/enemy1.png";
    var pillList = 0;

    this.regenerate = function(pill) {
        var posX = Math.floor((Math.random()*2) + 40);
        var posY = Math.floor((Math.random() * 10) + 1);
        var type = Math.floor((Math.random() * 3) + 1);
        var speed = Math.random();
        if (speed < 0.5) {
            speed = 0.5;
        }
        var spriteImg = null;
        if (type == RAT) {
            spriteImg = spriteImgPill;
            type = RAT;
        } else if (type == ENEMY) {
            spriteImg = spriteEnemy;
            type = ENEMY;
        } else {
            spriteImg = spriteImgPoint;
            type = FISH;
        }
        pill.construct(ctx, jumpsX, jumpsY, posX, posY, type, spriteImg, speed);
        return pill;
    }


    this.giveMeOne = function () {
        // 10 Y and 40 X
        var posX = Math.floor((Math.random()*2) + 40);
        var posY = Math.floor((Math.random() * 8) + 1);
        var type = Math.floor((Math.random() * 3) + 1);
        var speed = Math.random();
        if (speed < 0.5) {
            speed = 0.5;
        }
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
        } else {
            spriteImg = spriteImgPoint;
            type = FISH;
        }
        var pill = new Pill();

        pill.construct(ctx, jumpsX, jumpsY, posX, posY, type, spriteImg, speed);
        return pill;
    }

}