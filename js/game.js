var canvas = null,
    ctx = null;

function paint(ctx) {
    ctx.fillstyle = '#0f0';
    ctx.fillRect(50, 50, 180, 50);
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(25, 10, 250, 125);

}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    paint(ctx);
}

window.addEventListener('load', init, false);