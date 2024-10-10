const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const image = new Image();
image.src = './спрайты/фон.png';

const image2 = new Image();
image2.src = './спрайты/водолаз 12.png';

var b = false;

document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft') {
        b = true;
    }
});

function update() {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    if (!b)
    ctx.drawImage(image2, 500, 210, 50, 60);
    ctx.drawImage(image2, 550, 210, 50, 60);
}

function remove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    remove();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();