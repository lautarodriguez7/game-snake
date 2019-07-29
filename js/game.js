var canvas = null,
    ctx = null,
    x = 50,
    y = 50,
    lastPress = null;

var KEY_LEFT = 37, //movement on the keyboard
    KEY_UP = 38,
    KEY_RIGHT = 39,
    KEY_DOWN = 40;

var dir = 0; 

window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||  //For some older browsers that do not support requestAnimationFrame
        window.webkitRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 17);
        };
    }());
function paint(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0fff';
    ctx.fillRect(x, y, 20, 10);
    ctx.fillText('Last Press: ' + lastPress, 0, 20);
}


function act() {
    x += 2; //movement
    if (x > canvas.width) { //when you pass the screen to return(x=width)
        x= 0;
    }
    // Change the direction
    if (lastPress == KEY_UP) {
        dir = 0;
    }
    if (lastPress == KEY_RIGHT) {
        dir = 1;
    }
    if (lastPress == KEY_DOWN) {
        dir = 2;
    }
    if (lastPress == KEY_LEFT) {
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
}

function run() {
    setTimeout(run, 50);
    act();
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    run();
}

function repaint() {
    window.requestAnimationFrame(repaint);
    paint(ctx);
}

window.addEventListener('load', init, false);
document.addEventListener('keydown', function(evt) {
    lastPress = evt.which; // Through this method, we can make decisions in the game knowing the last key pressed.
}, false);