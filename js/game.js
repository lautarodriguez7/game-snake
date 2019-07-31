(function (window, undefined){ //It is used to be local and has no global problems
'use strict'; //we indicate that we use current code
//movements the keyboard
var KEY_ENTER = 13,
    KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40,

    canvas = null,
    ctx = null,
    lastPress = null,
    pause = true,
    gameover = true,
    dir = 0,
    score = 0,
    //wall = new Array(),
    body = [], // most fast than new array()
    // body = null, changed for body
    food = null;
    //images and sounds
    var iBody = new Image(),
        iFood = new Image(),
        aEat = new Audio(),
        aDie = new Audio();

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||  //For some older browsers that do not support requestAnimationFrame
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
    }());

    document.addEventListener('keydown', function(evt) {
        lastPress = evt.which; // Through this method, we can make decisions in the game knowing the last key pressed.
    }, false);

function Rectangle(x, y, width, height) {
    this.x = (x === undefined) ? 0 : x;
    this.y = (y === undefined) ? 0 : y;
    this.width = (width === undefined) ? 0 : width;
    this.height = (height === undefined) ? this.width : height;

   /* this.intersects = function (rect) {
        if (rect === undefined) {
            window.console.warn('Missing parameters on function intersects');
    } else {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
        }
        this.drawImage = function (ctx, img) {
            if (img === undefined) {
                window.console.warn('Missing parameters on function drawImage');
            } else {
                if (img.width) {
                    ctx.drawImage(img, this.x, this.y);
                } else {
                    ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
        }
    };

    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };*/
    }

Rectangle.prototype = {
    constructor: Rectangle,

    intersects: function (rect) {
        if (rect === undefined) {
            window.console.warn('Missing parameters on function intersects');
    } else {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
        }
    },

    fill: function (ctx) {
        if (ctx === undefined) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    },

    drawImage: function (ctx, img) {
        if (img === undefined) {
            window.console.warn('Missing parameters on function drawImage');
        } else {
            if (img.width) {
                ctx.drawImage(img, this.x, this.y);
            } else {
                ctx.strokeRect(this.x, this.y, this.width, this.height);
            }
        } 
    }
};

/*Rectangle.prototype.intersects = function (rect) {
    if (rect === undefined) {
        window.console.warn('Missing parameters on function intersects');
    } else {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
        }
    };
Rectangle.prototype.fill = function (ctx) {
    if (ctx === undefined) {
        window.console.warn('Missing parameters on function fill');
    } else {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};
Rectangle.prototype.drawImage = function (ctx, img) {
    if (img === undefined) {
        window.console.warn('Missing parameters on function drawImage');
    } else {
        if (img.width) {
            ctx.drawImage(img, this.x, this.y);
        } else {
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
};*/

function random(max) {
    //return Math.floor(Math.random() * max);
    return ~~(Math.random() * max); //most fast
}

function canPlayOgg() {
    var aud = new Audio();
    if (aud.canPlayType('audio/ogg').replace(/no/, '')) {
        return true;
    } else {
        return false;
    }
} 

function reset() {
    score = 0;
    dir = 1;
    body.length = 0;
    body.push(new Rectangle(40, 40, 10, 10));
    body.push(new Rectangle(0, 0, 10, 10));
    body.push(new Rectangle(0, 0, 10, 10));
    food.x = random(canvas.width / 10 - 1) * 10;
    food.y = random(canvas.height / 10 - 1) * 10;
    gameover = false;
}

function paint(ctx) {
    var i = 0 ,
        l = 0;

    //clean canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   //draw body
   ctx.fillStyle = '#0f0';
   body.fill(ctx);

    //draw player
    //ctx.fillStyle = '0f0';
    for (i = 0, l = body.length; i < l; i += 1) {
       //body[i].fill(ctx);
       body[i].drawImage(ctx, iBody);
    }

   // Draw walls
    /*ctx.fillStyle = '#fff';
    for (i = 0, l = wall.length; i < l; i += 1) {
        wall[i].fill(ctx);
    }  */
    
    //draw food
    //ctx.fillStyle = '#f00';
    //food.fill(ctx);
    ctx.strokeStyle = '#f00';
    ctx.drawImage(iFood, food.x, food.y);

    // Debug last key pressed
    ctx.fillStyle = '#f0ff'
    //ctx.fillText('Last Press: ' + lastPress, 0, 20);

    //Draw score
    ctx.fillText('Score: ' + score, 0, 10);

    // Draw pause
    if (pause) {
        ctx.textAlign = 'center';
        if (gameover) {
        ctx.fillText('GAME OVER', 150, 75);
        } else {
        ctx.fillText('PAUSE', 150, 75);
        }
        ctx.textAlign = 'left';
    }
}


function act() {
    var i=0,
        l=0;
    if (!pause) { 
    //Game Over reset
    if (gameover) {
        reset()
    }

    // Move Body
    for (i = body.length - 1; i > 0; i -= 1) {
        body[i].x = body[i - 1].x;
        body[i].y = body[i - 1].y;
        }

    // Change the direction
    if (lastPress == KEY_UP && dir != 2) {
        dir = 0;
    }
    if (lastPress == KEY_LEFT && dir != 3) {
        dir = 1;
    }
    if (lastPress == KEY_DOWN && dir != 0) {
        dir = 2;
    }
    if (lastPress == KEY_RIGHT && dir != 1) {
        dir = 3;
    }
    // Move head
    if (dir === 0) {
        body[0].y -= 10;
    }
    if (dir === 1) {
        body[0].x -= 10;
    }
    if (dir === 2) {
        body[0].y += 10;
    }
    if (dir === 3) {
        body[0].x += 10;
    }
    
    
  // Out Screen
    if (body[0].x > canvas.width) {
    body[0].x = 0;
    }
    if (body[0].y > canvas.height) {
    body[0].y = 0;
    }
    if (body[0].x < 0) {
    body.x = canvas.width;
    }
    if (body[0].y < 0) {
    body[0].y = canvas.height;
    }

    // Body Intersects
    for (i = 2, l = body.length; i < l; i += 1) {
        if (body[0].intersects(body[i])) {
        gameover = true;
        pause = true;
        aDie.play();
        }
    }

    // Food intersects
    if (body[0].intersects(food)) {
        body.push(new Rectangle(food.x, food.y, 10, 10));
        score += 1;
        food.x = random(canvas.width / 10 - 1) * 10;
        food.y = random(canvas.height / 10 -1) * 10;
        aEat.play();
    }
    // Wall Intersects
    for (i = 0, l = wall.length; i < l; i += 1) {
        if (food.intersects(wall[i])) {
            food.x = random(canvas.width / 10 - 1) * 10;
            food.y = random(canvas.height / 10 - 1) * 10;
        }
        if (body.intersects(wall[i])) {
            gameover = true;
            pause = true;
        }
    }
}

    //Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

function run() {
    setTimeout(run, 50);
    act();
}

function init() {
    // Load assets
    iBody.src = 'assets/body.png';
    iFood.src = 'assets/fruits.png';
    aEat.src = 'assets/chomp.oga';
    aDie.src = 'assets/dies.oga';

    // Get canvas and context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
   
    // Create food
    food = new Rectangle(80, 80, 10, 10);
    
    // Create walls
    wall.push(new Rectangle(100, 50, 10, 10));
    wall.push(new Rectangle(100, 100, 10, 10));
    wall.push(new Rectangle(200, 50, 10, 10));
    wall.push(new Rectangle(200, 100, 10, 10));
    
    // Start game
    run();
    repaint();
}

window.addEventListener('load', init, false);
}(window));
