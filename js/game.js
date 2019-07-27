var canvas = null,
    ctx = null;

function paint(ctx) {
    ctx.fillstyle = '#0f0';
    ctx.fillRect(50, 50, 110, 10);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    paint(ctx);
}

var x = 50,
    y = 50;

function paint(ctx) {
    ctx.fillstyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
window.addEventListener('load', init, false);