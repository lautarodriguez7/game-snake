var canvas = null,
    ctx = null,
    player = null,
    dir = 0,
    lastPress = null,
    food = null,
    score = 0,
    pause = true;
    
//movement on the keyboard
var KEY_LEFT = 37,
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40;
    KEY_ENTER = 13;

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
    this.x = (x == null) ? 0 : x;
    this.y = (y == null) ? 0 : y;
    this.width = (width == null) ? 0 : width;
    this.height = (height == null) ? this.width : height;

    this.intersects = function (rect) {
        if (rect == null) {
            window.console.warn('Missing parameters on function intersects');
    } else {
        return (this.x < rect.x + rect.width &&
            this.x + this.width > rect.x &&
            this.y < rect.y + rect.height &&
            this.y + this.height > rect.y);
        }
    };
    this.fill = function (ctx) {
        if (ctx == null) {
            window.console.warn('Missing parameters on function fill');
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        };
    }

function random(max) {
    return Math.floor(Math.random() * max);
    }

function paint(ctx) {
    //clean canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   //draw player
   ctx.fillStyle = '#0f0';
   player.fill(ctx);

    //draw food
    ctx.fillStyle = '#f00';
    food.fill(ctx);

    // Debug last key pressed
    ctx.fillStyle = '#fff'
    ctx.fillText('Last Press: ' + lastPress, 0, 20);

    //Draw score
    ctx.fillText('Score: ' + score, 0, 10);

    //Draw pause
    if (pause) {
        ctx.textAlign = 'center';
        ctx.fillText('PAUSE', 150, 75);
        ctx.textAlign = 'left';
    }  
}


function act() {
    if (!pause) { 
    // Change the direction
        if (lastPress == KEY_UP) {
            dir = 0;
        }
        if (lastPress == KEY_LEFT) {
            dir = 1;
        }
        if (lastPress == KEY_DOWN) {
            dir = 2;
        }
        if (lastPress == KEY_RIGHT) {
            dir = 3;
        }

        // Move rect
        if (dir == 0) {
            player.y -= 10;
        }
        if (dir == 1) {
            player.x -= 10;
        }
        if (dir == 2) {
            player.y += 10;
        }
        if (dir == 3) {
            player.x += 10;
        }

      // Out Screen
        if (player.x > canvas.width) {
        player.x = 0;
        }
        if (player.y > canvas.height) {
        player.y = 0;
        }
        if (player.x < 0) {
        player.x = canvas.width;
        }
        if (player.y < 0) {
        player.y = canvas.height;
        }
         // Food instersects
        if (player.intersects(food)) {
            score += 1;
            food.x = random(canvas.width / 10 - 1) * 10;
            food.y = random(canvas.height / 10 -1) * 10;
        }
    }

   

    //Pause/Unpause
    if (lastPress == KEY_ENTER) {
        pause = !pause;
        lastPress = null;
    }
}

function run() {
    setTimeout(run, 50);
    act();
}

function init() {
    // Get canvas and context
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Create player and food
    player = new Rectangle(40, 40, 10, 10);
    food = new Rectangle(80, 80, 10, 10);

    //Start game
    run();
    repaint();
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

window.addEventListener('load', init, false);

