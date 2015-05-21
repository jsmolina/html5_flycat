var World = function (idCanvas) {
    var idCanvas = idCanvas;
    var ctx = null;
    var canvasTemp = document.createElement("canvas");
    var scrollImg = new Image();
    var imgWidth = 0;
    var imgHeight = 0;
    var canvasWidth = 1000;
    var canvasHeight = 400;

    var scrollVal = 0;
    var speed = 2;
    var rtl_counter = 0;
    var pill_counter = 10;
    var counter = 0;
    var jumpsX = 0;
    var jumpsY = 0;
    var inst = this;
    var score = 0;
    var pillFactory = null;

    var hero = null;
    var enemies = [];
    var pills = [];


    this.construct = function() {
        ctx = this.loadCanvas(idCanvas);
        scrollImg.src = "images/sky1.png";
        scrollImg.onload = this.loadImage;
        var p = null;
        var pill = null;
        pillFactory = new PillFactory(ctx, jumpsX, jumpsY);
        for (i = 0; i < pill_counter; i++) {
            pill = Pill();
            pill = pillFactory.giveMeOne(pill);
            pills.push(pill);
        }
        this.countMove();
    };

    this.loadCanvas = function (idCanvas) {
        var elemento = document.getElementById(idCanvas);


        if (elemento && elemento.getContext) {
            var ctx = elemento.getContext('2d');
            if (ctx) {
                canvasWidth = ctx.canvas.width;
                canvasHeight = ctx.canvas.height;
                jumpsX = Math.round(canvasWidth / 40);
                jumpsY = Math.round(canvasHeight / 10);

                hero = new Hero(ctx, jumpsX, jumpsY);
                hero.construct();

                return ctx;
            }
        }
        return false;
    };


    this.loadImage = function () {
        imgWidth = scrollImg.width,
        imgHeight = scrollImg.height;
        canvasTemp.width = imgWidth;
        canvasTemp.height = imgHeight;
        inst.render();
    };

    this.countMove = function() {
        counter++;

        if (counter > 4) {
            counter = 0;
        }

        setTimeout(function () {
            inst.countMove();
        }, 50);
    };


    this.render = function() {

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        if (scrollVal >= canvasWidth) {
            //console.log(scrollVal);
            scrollVal = 0;
        }
        var time = +new Date();
        if (time % 2 == 0) {
            scrollVal += speed;
        }

        // To go the other way instead
        ctx.drawImage(scrollImg, -scrollVal, 0, imgWidth, imgHeight);
        ctx.drawImage(scrollImg, canvasWidth - scrollVal, 0, imgWidth, imgHeight);

        hero.render(counter);

        for (var i = 0; i < pills.length; i++) {
            var pill = pills[i];
            // if arrived to zero, then generate another one
            if(!pill.render(time, hero)) {
                pills[i] = pillFactory.regenerate(pill);
            }
        }

        this.drawText("SCORE " + hero.getScore(), 0, 10);
        this.drawText("LIVES " + hero.getLives(), 0, 9.5);

        setTimeout(function () {
            inst.render();
        }, 60);
    };

    /**
     * Draws a specific text in canvas
     * @param text
     * @param originX
     * @param originY
     */
    this.drawText = function (text, originX, originY) {
        ctx.font = '0.9em courier';
        ctx.strokeStyle = "#FFFFFF";

        var xPosition = originX;
        var yPosition = originY;
        // relative or absolute?
        if (originX < 101 && originY < 101) {
            xPosition = xPosition * jumpsX;
            yPosition = yPosition * jumpsY  ;
        }
        ctx.strokeText(text, xPosition, yPosition);
        ctx.textBaseline = 'bottom';
    };


    this.keyDown = function (event) {
        event = event || window.event;
        var e = event.keyCode;

        if (e==38 /*up*/){
            hero.heroUp();
        } else if(e == 40 /*down*/) {
            hero.heroDown();
        //ship.accelerate(-partsX * 0.5, 0);
        } else if (e == 37 /*left*/) {
            hero.heroLeft();
        //ship.accelerate(partsX * 0.5, 0);
        } else if (e == 39 /*right*/) {
            hero.heroRight();
        }
        return false;
    }

}
