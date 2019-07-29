var canvas = null,
    ctx = null,
    player = null,
    dir = 0;
    lastPress = null,
    food = null,
    score = 0,
    pause = true;
    

var KEY_LEFT = 37, //movement on the keyboard
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

    // Draw square
    ctx.fillStyle = '#0fff';
    ctx.fillRect(x, y, 20, 10);

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

    //draw food
    ctx.fillStyle = '#f00';
    food.fill(ctx);
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
            y -= 10;
        }
        if (dir == 1) {
            x -= 10;
        }
        if (dir == 2) {
            y += 10;
        }
        if (dir == 3) {
            x += 10;
        }

        //Out Screen
        if (x > canvas.width) {
            x = 0;
        }
        if (y > canvas.height) {
            y = 0;
        }
        if (x < 0) {
            x = canvas.width;
        }
        if (y < 0) {
            y = canvas.height;
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

