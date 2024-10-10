class Diver {
    #diversStates;
    #diversStatesWithoutBag;
    #diversStatesWithBag;
    #curInd = 0;
    #isAlive = true;
    #isFirst = false;
    #firstBoatPos = 2;
    #leftBorder = 0;

    // продумать возвращение с мешком и без мешка
    // придумать собирание сокровища

    constructor() {
        const image0 = new Image();
        image0.src = './спрайты/водолазы/водолаз 12.png';
        const image2 = new Image();
        image2.src = './спрайты/водолазы/водолаз 3.png';
        const image3 = new Image();
        image3.src = './спрайты/водолазы/водолаз 4.png';
        const image4 = new Image();
        image4.src = './спрайты/водолазы/водолаз 5.png';
        const image5 = new Image();
        image5.src = './спрайты/водолазы/водолаз 6.png';
        const image6 = new Image();
        image6.src = './спрайты/водолазы/водолаз 7.png';
        //const image7 = new Image();
        //image7.src = './водолазы/водолаз 12.png';
        //const image0 = new Image();
        this.#diversStatesWithoutBag = {
            0: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            1: { 'x': 500, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            2: { 'x': 417, 'y': 210, 'width': 80, 'height': 60, 'image': image2 },
            3: { 'x': 425, 'y': 320, 'width': 105, 'height': 85, 'image': image3 },
            4: { 'x': 450, 'y': 440, 'width': 80, 'height': 100, 'image': image4 },
            5: { 'x': 555, 'y': 505, 'width': 85, 'height': 90, 'image': image5 },
            6: { 'x': 675, 'y': 505, 'width': 85, 'height': 90, 'image': image6 },
            //7: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': image7 },
            //...
        }

        /*diversStatesWithBag = {

        }*/
        
        this.#diversStates = this.#diversStatesWithoutBag;
    }
    setIsFirst(isFirst) {
        this.#isFirst = isFirst;
        if (isFirst) {
            this.#curInd = this.#firstBoatPos;
            this.#leftBorder = this.#firstBoatPos;
        }
    }
    setIsAlive(isAlive) {
        this.#isAlive = isAlive;
        this.#isFirst = false;
    }
    getCurrentPos() {
        return this.#curInd;
    }
    getIsAlive() {
        return this.#isAlive;
    }
    getAttrs() {
        return this.#diversStates[this.#curInd];
    }
    moveLeft() {
        if (this.#isAlive && this.#curInd > this.#leftBorder) {
            this.#curInd--;
        }
    }
    moveRight() {
        if (this.#isAlive && this.#curInd < Object.keys(this.#diversStates).length-1) {
            this.#curInd++;
        }
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const background = new Image();
background.src = './спрайты/фон.png';

var divers = [new Diver()];
//divers[0].setIsFirst(true);
var currentDiver = divers[0];


function gameLoop(divers) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < divers.length; i++) {
        let diverAttrs = divers[i].getAttrs();
        ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
    }
    requestAnimationFrame(() => { this.gameLoop(divers) });
}

function main() {
    //for (let i = 0; i < divers.length; i++) {
    window.addEventListener('keyup', function(event) {
        
            if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
                currentDiver.moveLeft();
            } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
                currentDiver.moveRight();
            }
        
    });
//}
    gameLoop(divers);
}

main();
