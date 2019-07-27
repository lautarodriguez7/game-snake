var canvas = null,
    ctx = null,
    x = 50,
    y = 50,
    lastPress = null;

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
}


function act() {
    x += 2; //movement
    if (x > canvas.width) { //when you pass the screen to return(x=width)
        x= 0;
    }
}

function run() {
    window.requestAnimationFrame(run);
    act();
    paint(ctx);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    run();
}

window.addEventListener('load', init, false);