var canvas = null,
    ctx = null,
    x = 50,
    y = 50;


function paint(ctx) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0fff';
    ctx.fillRect(x, y, 10, 10);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    paint(ctx);
}

function act() {
    x += 2;
}

function run() {
    window.requestAnimationFrame(run);
    ActiveXObject();
    paint(ctx);
}

window.addEventListener('load', init, false);