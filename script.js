class UI {
    #digits;
    #score = 0;
    #pressedButton;

    constructor() {
        const digit1 = new Image();
        digit1.src = './спрайты/интерфейс/-1.png';
        const digit2 = new Image();
        digit2.src = './спрайты/интерфейс/-1.png';
        const digit3 = new Image();
        digit3.src = './спрайты/интерфейс/-1.png';
        const digit4 = new Image();
        digit4.src = './спрайты/интерфейс/-1.png';
        this.#digits = [digit1, digit2, digit3, digit4];

        const pressedButton = new Image();
        pressedButton.src = "./спрайты/интерфейс/нажатая кнопка.png"; 
        this.#pressedButton = pressedButton;
    }

    getDigits() {
        return this.#digits;
    }
    addScore() {
        this.#score++;
        //console.log(this.#score);
    }
    getPressedButton() {
        return this.#pressedButton;
    }
}


class Diver {
    #diversStates;
    #diversStatesWithoutBag;
    #diversStatesWithBag;
    #curInd = 0;
    #isAlive = true;
    #isFirst = false;
    #firstBoatPos = 2;
    #lastPos = 7;
    #leftBorder = 0;

    constructor() {
        const image0 = new Image();
        image0.src = './спрайты/водолазы/водолаз 12.png';
        const image2 = new Image();
        image2.src = './спрайты/водолазы/водолаз 3 (без мешка).png';
        const image3 = new Image();
        image3.src = './спрайты/водолазы/водолаз 4 (без мешка).png';
        const image4 = new Image();
        image4.src = './спрайты/водолазы/водолаз 5 (без мешка).png';
        const image5 = new Image();
        image5.src = './спрайты/водолазы/водолаз 6 (без мешка).png';
        const image6 = new Image();
        image6.src = './спрайты/водолазы/водолаз 7 (без мешка).png';
        const image7 = new Image();
        image7.src = './спрайты/водолазы/водолаз 9 (без мешка).png';
      
        this.#diversStatesWithoutBag = {
            0: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            1: { 'x': 500, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            2: { 'x': 415, 'y': 210, 'width': 60, 'height': 60, 'image': image2 },
            3: { 'x': 425, 'y': 320, 'width': 85, 'height': 85, 'image': image3 },
            4: { 'x': 455, 'y': 440, 'width': 75, 'height': 90, 'image': image4 },
            5: { 'x': 550, 'y': 505, 'width': 80, 'height': 85, 'image': image5 },
            6: { 'x': 680, 'y': 505, 'width': 75, 'height': 85, 'image': image6 },
            7: { 'x': 825, 'y': 510, 'width': 75, 'height': 85, 'image': image7 },
            //...
        }
        const image2wb = new Image();
        image2wb.src = './спрайты/водолазы/водолаз 3.png';
        const image3wb = new Image();
        image3wb.src = './спрайты/водолазы/водолаз 4.png';
        const image4wb = new Image();
        image4wb.src = './спрайты/водолазы/водолаз 5.png';
        const image5wb = new Image();
        image5wb.src = './спрайты/водолазы/водолаз 6.png';
        const image6wb = new Image();
        image6wb.src = './спрайты/водолазы/водолаз 7.png';
        const image7wb = new Image();
        image7wb.src = './спрайты/водолазы/водолаз 9.png';
        const image8wb = new Image();
        image8wb.src = './спрайты/водолазы/водолаз 8.png';
        const image9wb = new Image();
        image9wb.src = './спрайты/водолазы/водолаз 10.png';

        this.#diversStatesWithBag = {
            0: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            1: { 'x': 500, 'y': 210, 'width': 50, 'height': 60, 'image': image0 },
            2: { 'x': 417, 'y': 210, 'width': 80, 'height': 60, 'image': image2wb },
            3: { 'x': 425, 'y': 320, 'width': 105, 'height': 85, 'image': image3wb },
            4: { 'x': 450, 'y': 440, 'width': 80, 'height': 100, 'image': image4wb },
            5: { 'x': 555, 'y': 505, 'width': 85, 'height': 90, 'image': image5wb },
            6: { 'x': 675, 'y': 505, 'width': 85, 'height': 90, 'image': image6wb },
            7: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': image7wb },
            8: { 'x': 794, 'y': 510, 'width': 160, 'height': 86, 'image': image8wb },
            9: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': image7wb },
            10: { 'x': 794, 'y': 510, 'width': 105, 'height': 86, 'image': image9wb },
        }
        
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
    isGetMoneyPos() {
        return this.#curInd == this.#lastPos;
    }
    getIsAlive() {
        return this.#isAlive;
    }
    getAttrs() {
        return this.#diversStates[this.#curInd];
    }
    moveLeft() {
        if (this.#isAlive && this.#curInd > this.#leftBorder && this.#curInd <= this.#lastPos) {
            this.#curInd--;
        }
    }
    moveRight() {
        if (this.#curInd == this.#lastPos) {
            this.#diversStates = this.#diversStatesWithBag;
        }
        if (this.#isAlive && this.#curInd < this.#lastPos) {
            this.#curInd++;
        }
    }
    getMoney() {
        if (this.#curInd >= this.#lastPos && this.#curInd < Object.keys(this.#diversStates).length-1) {
            this.#curInd++;
        } else if (this.#curInd >= Object.keys(this.#diversStates).length-1) {
            this.#curInd = this.#lastPos;
        }
    }
}

/*function gameLoop(divers) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    for (let i = 0; i < divers.length; i++) {
        let diverAttrs = divers[i].getAttrs();
        ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
    }
    requestAnimationFrame(() => { this.gameLoop(divers) });
}*/

function getMoneyAnimation(ui, currentDiver, obj, ctx) {
    if (currentDiver.isGetMoneyPos() && !obj.animationGetMoneyPlay) {
        ui.addScore();
        obj.animationGetMoneyPlay = true;
        var getMoney = setInterval(function() {
            currentDiver.getMoney();
            let diverAttrs = currentDiver.getAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
            obj.innerCounter++;
            if (obj.innerCounter >= 4) {
                obj.innerCounter = 0;
                obj.animationGetMoneyPlay = false;
                clearInterval(getMoney);
            }
        }, 200);
    }
}

function main() {
    var isLeftButtonPressed = false;
    var isRightButtonPressed = false;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const background = new Image();
    background.src = './спрайты/фон.png';

    var ui = new UI();
    var pressedButton = ui.getPressedButton();

    var divers = [new Diver()];
    divers[0].setIsFirst(true);
    var currentDiver = divers[0];
    //for (let i = 0; i < divers.length; i++) {
    var innerCounter = 0;
    var animationGetMoneyPlay = false;

    window.addEventListener('keyup', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            if (!obj.animationGetMoneyPlay) currentDiver.moveLeft();
            isLeftButtonPressed = false;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            currentDiver.moveRight();
            isRightButtonPressed = false;
        }

    });

    const obj = { innerCounter: innerCounter, animationGetMoneyPlay: animationGetMoneyPlay };
    window.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            if (!animationGetMoneyPlay) isLeftButtonPressed = true;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            if (!animationGetMoneyPlay) isRightButtonPressed = true;
            getMoneyAnimation(ui, currentDiver, obj, ctx);
        }
    });

    window.addEventListener('mousedown', function(event) {
        if (event.which == 1) {
            var rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top; 
            if (clickX >= 100 && clickX <= 200 && clickY >= 557 && clickY <= 657) {
                isLeftButtonPressed = true;
            } else if (clickX >= 1240 && clickX <= 1340 && clickY >= 557 && clickY <= 657) {
                isRightButtonPressed = true;
                getMoneyAnimation(ui, currentDiver, obj, ctx);
            }
        }
    });
    window.addEventListener('mouseup', function(event) {
        if (event.which == 1) {
            var rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top; 
            if (clickX >= 100 && clickX <= 200 && clickY >= 557 && clickY <= 657) {
                isLeftButtonPressed = false;
                currentDiver.moveLeft();
            } else if (clickX >= 1240 && clickX <= 1340 && clickY >= 557 && clickY <= 657) {
                isRightButtonPressed = false;
                currentDiver.moveRight();
            }
        }
    });
    
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        for (let i = 0; i < divers.length; i++) {
            let diverAttrs = divers[i].getAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
        }
        if (isLeftButtonPressed) {
            ctx.drawImage(pressedButton, 100, 557, 100, 100);
        } else if (isRightButtonPressed) {
            ctx.drawImage(pressedButton, 1240, 557, 100, 100);
        }
        
        
    }, 20);
    //gameLoop(divers);
}

main();
