class UI {
    #digits;
    #score = 0;
    #pressedButton;

    constructor() {
        const digit1 = new Image();
        digit1.src = './спрайты/интерфейс/0.png';
        const digit2 = new Image();
        digit2.src = './спрайты/интерфейс/-1.png';
        const digit3 = new Image();
        digit3.src = './спрайты/интерфейс/-1.png';
        const digit4 = new Image();
        digit4.src = './спрайты/интерфейс/-1.png';
        this.#digits = {
            0: {'x': 830, 'y': 205, 'width': 40, 'height': 65, 'image': digit1}, 
            1: {'x': 782, 'y': 205, 'width': 40, 'height': 65, 'image': digit2},
            2: {'x': 715, 'y': 205, 'width': 40, 'height': 65, 'image': digit3},
            3: {'x': 668, 'y': 205, 'width': 40, 'height': 65, 'image': digit4}
        };

        const pressedButton = new Image();
        pressedButton.src = "./спрайты/интерфейс/нажатая кнопка.png"; 
        this.#pressedButton = pressedButton;
    }

    getDigits() {
        return this.#digits;
    }
    addScore() {
        this.#score++;
        let strScore = String(this.#score);
        for (let i = 0; i < strScore.length; i++) {
            const image = new Image();
            image.src = `./спрайты/интерфейс/${strScore[i]}.png`;
            this.#digits[strScore.length-1-i]['image'] = image;
        }
    }
    getPressedButton() {
        return this.#pressedButton;
    }
}


class Tentacle {
    #states;
    #currendState = 0;
    #nextStateInc = 1;

    constructor(ind) {
        const tentacleOpacity = new Image();
        const tentacle1 = new Image();
        const tentacle2 = new Image();
        const tentacle3 = new Image();
        const tentacle4 = new Image();
        const tentacle5 = new Image();
        if (ind == 0) {
            tentacleOpacity.src = './спрайты/щупальца/щ1(прозрачные).png';
            tentacle1.src = './спрайты/щупальца/щ11.png';
            tentacle2.src = './спрайты/щупальца/щ12.png';
            tentacle3.src = './спрайты/щупальца/щ13.png';
            this.#states = {
                0: {'image': tentacleOpacity, 'x': 490, 'y': 330, 'width': 165, 'height': 40}, 
                1: {'image': tentacle1, 'x': 490, 'y': 330, 'width': 165, 'height': 40}, 
                2: {'image': tentacle2, 'x': 490, 'y': 330, 'width': 165, 'height': 40}, 
                3: {'image': tentacle3, 'x': 490, 'y': 330, 'width': 165, 'height': 40}
            };
        } else if (ind == 1) {
            tentacleOpacity.src = './спрайты/щупальца/щ2(прозрачные).png';
            tentacle1.src = './спрайты/щупальца/щ21.png';
            tentacle2.src = './спрайты/щупальца/щ22.png';
            tentacle3.src = './спрайты/щупальца/щ23.png';
            tentacle4.src = './спрайты/щупальца/щ24.png';
            this.#states = {
                0: {'image': tentacleOpacity, 'x': 515, 'y': 345, 'width': 145, 'height': 130}, 
                1: {'image': tentacle1, 'x': 515, 'y': 345, 'width': 145, 'height': 130}, 
                2: {'image': tentacle2, 'x': 515, 'y': 345, 'width': 145, 'height': 130}, 
                3: {'image': tentacle3, 'x': 515, 'y': 345, 'width': 145, 'height': 130},
                4: {'image': tentacle4, 'x': 515, 'y': 345, 'width': 145, 'height': 130}
            };
        } else if (ind == 2) {
            tentacleOpacity.src = './спрайты/щупальца/щ3(прозрачные).png';
            tentacle1.src = './спрайты/щупальца/щ31.png';
            tentacle2.src = './спрайты/щупальца/щ32.png';
            tentacle3.src = './спрайты/щупальца/щ33.png';
            tentacle4.src = './спрайты/щупальца/щ34.png';
            tentacle5.src = './спрайты/щупальца/щ35.png';
            this.#states = {
                0: {'image': tentacleOpacity, 'x': 630, 'y': 380, 'width': 80, 'height': 155}, 
                1: {'image': tentacle1, 'x': 630, 'y': 380, 'width': 80, 'height': 155}, 
                2: {'image': tentacle2, 'x': 630, 'y': 380, 'width': 80, 'height': 155}, 
                3: {'image': tentacle3, 'x': 630, 'y': 380, 'width': 80, 'height': 155},
                4: {'image': tentacle4, 'x': 630, 'y': 380, 'width': 80, 'height': 155},
                5: {'image': tentacle5, 'x': 630, 'y': 380, 'width': 80, 'height': 155},
            };
        } else if (ind == 3) {
            tentacleOpacity.src = './спрайты/щупальца/щ4(прозрачные).png';
            tentacle1.src = './спрайты/щупальца/щ41.png';
            tentacle2.src = './спрайты/щупальца/щ42.png';
            tentacle3.src = './спрайты/щупальца/щ43.png';
            tentacle4.src = './спрайты/щупальца/щ44.png';
            this.#states = {
                0: {'image': tentacleOpacity, 'x': 735, 'y': 420, 'width': 40, 'height': 120}, 
                1: {'image': tentacle1, 'x': 735, 'y': 420, 'width': 40, 'height': 120}, 
                2: {'image': tentacle2, 'x': 735, 'y': 420, 'width': 40, 'height': 120}, 
                3: {'image': tentacle3, 'x': 735, 'y': 420, 'width': 40, 'height': 120},
                4: {'image': tentacle4, 'x': 735, 'y': 420, 'width': 40, 'height': 120},
            };
        } else if (ind == 4) {
            tentacleOpacity.src = './спрайты/щупальца/щ5(прозрачные).png';
            tentacle1.src = './спрайты/щупальца/щ51.png';
            tentacle2.src = './спрайты/щупальца/щ52.png';
            tentacle3.src = './спрайты/щупальца/щ53.png';
            this.#states = {
                0: {'image': tentacleOpacity, 'x': 880, 'y': 460, 'width': 50, 'height': 90}, 
                1: {'image': tentacle1, 'x': 880, 'y': 460, 'width': 50, 'height': 90}, 
                2: {'image': tentacle2, 'x': 880, 'y': 460, 'width': 50, 'height': 90}, 
                3: {'image': tentacle3, 'x': 880, 'y': 460, 'width': 50, 'height': 90},
            };
        }
    }
    updateCurrentState() {
        if (this.#currendState == Object.keys(this.#states).length - 1) {
            this.#nextStateInc = -1;
        } else if (this.#currendState == 0) {
            this.#nextStateInc = 1;
        }
        this.#currendState += this.#nextStateInc;
    }
    getCurrentState() {
        return this.#states[this.#currendState];
    }
    getIs0CurrentState() {
        return this.#currendState == 0;
    }
    getIsLastCurrentState() {
        return this.#currendState == Object.keys(this.#states).length - 1;
    }
}


class Octopus {
    #tentacles;
    #currentTentacle = 0;
    #tentacle1;
    #tentacle2;

    constructor() {
        this.#tentacle1 = new Tentacle(0);
        this.#tentacle2 = new Tentacle(1);
        this.#tentacles = [this.#tentacle1, new Tentacle(3), new Tentacle(2), new Tentacle(4)];
    }

    move() {
        if (this.#tentacles[0].getIs0CurrentState()) {
            this.#tentacles[0] = Math.floor(Math.random() * 2) == 0 ? this.#tentacle1 : this.#tentacle2;
        }
        this.#tentacles[this.#currentTentacle % this.#tentacles.length].updateCurrentState();
        this.#currentTentacle++;
    }

    getFirstTentacle() {
        return this.#tentacle1.getCurrentState();
    }

    getSecondTentacle() {
        return this.#tentacle2.getCurrentState();
    }

    getThirdTentacle() {
        return this.#tentacles[1].getCurrentState();
    }

    getFourthTentacle() {
        return this.#tentacles[2].getCurrentState();
    }

    getFifthTentacle() {
        return this.#tentacles[3].getCurrentState();
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
    #isWithBag = false;

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
            2: { 'x': 415, 'y': 210, 'width': 88, 'height': 60, 'image': image2wb },
            3: { 'x': 425, 'y': 320, 'width': 105, 'height': 85, 'image': image3wb },
            4: { 'x': 450, 'y': 440, 'width': 80, 'height': 100, 'image': image4wb },
            5: { 'x': 555, 'y': 505, 'width': 85, 'height': 90, 'image': image5wb },
            6: { 'x': 675, 'y': 505, 'width': 85, 'height': 90, 'image': image6wb },
            7: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': image7wb },
            8: { 'x': 794, 'y': 509, 'width': 160, 'height': 83.5, 'image': image8wb },
            9: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': image7wb },
            10: { 'x': 794, 'y': 510, 'width': 107, 'height': 86, 'image': image9wb },
        }
        
        this.#diversStates = this.#diversStatesWithoutBag;
    }

    setIsFirst(isFirst) {
        this.#isFirst = isFirst;
        if (isFirst) {
            this.#curInd = this.#firstBoatPos;
            this.#leftBorder = this.#firstBoatPos+1;
        }
    }
    setIsAlive(isAlive) {
        this.#isAlive = isAlive;
        this.#isFirst = false;
    }
    isGetMoneyPos() {
        return this.#curInd == this.#lastPos;
    }
    getIsOnBoat() {
        return this.#curInd == this.#firstBoatPos;
    }
    getIsOnBoatWithBag() {
        return this.#curInd == this.#firstBoatPos && this.#isWithBag;
    }
    getIsWithBag() {
        return this.#isWithBag;
    }
    bagAnimationMovement() {
        if (this.#isWithBag) {
            this.#isWithBag = false;
            this.#diversStates = this.#diversStatesWithoutBag;
        } else {
            this.#isWithBag = true;
            this.#diversStates = this.#diversStatesWithBag;
        }
    }
    getIsAlive() {
        return this.#isAlive;
    }
    getAttrs() {
        return this.#diversStates[this.#curInd];
    }
    moveLeft() {
        if (this.#curInd == this.#firstBoatPos) {
            this.#diversStates = this.#diversStatesWithoutBag;
            this.#leftBorder = this.#firstBoatPos + 1;
        }
        if (this.#isAlive && this.#curInd > this.#leftBorder && this.#curInd <= this.#lastPos) {
            this.#curInd--;
        }
    }
    moveRight() {
        if (this.#curInd == this.#lastPos) {
            this.#diversStates = this.#diversStatesWithBag;
            this.#isWithBag = true;
            this.#leftBorder = this.#firstBoatPos;
        }
        if (this.#curInd == this.#firstBoatPos) {
            this.#leftBorder = this.#firstBoatPos+1;
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
        obj.animationGetMoneyPlay = true;
        var getMoney = setInterval(function() {
            currentDiver.getMoney();
            let diverAttrs = currentDiver.getAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
            if (currentDiver.getIsWithBag()) 
            obj.innerCounter++;
            if (obj.innerCounter >= 4) {
                obj.innerCounter = 0;
                obj.animationGetMoneyPlay = false;
                ui.addScore();
                clearInterval(getMoney);
            }
        }, 100);
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

    var octopus = new Octopus();

    var divers = [new Diver()];
    divers[0].setIsFirst(true);
    var currentDiver = divers[0];
    //for (let i = 0; i < divers.length; i++) {
    var innerCounter = 0;
    var animationGetMoneyPlay = false;

    const obj = { innerCounter: innerCounter, animationGetMoneyPlay: animationGetMoneyPlay };

    window.addEventListener('keyup', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            if (!obj.animationGetMoneyPlay) {
                currentDiver.moveLeft();
            }
            isLeftButtonPressed = false;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            currentDiver.moveRight();
            isRightButtonPressed = false;
        }

    });

    window.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            isLeftButtonPressed = true;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            isRightButtonPressed = true;
            getMoneyAnimation(ui, currentDiver, obj, ctx);
        }
    });

    window.addEventListener('mousedown', function(event) {
        if (event.which == 1) {
            var rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top; 
            if (clickX >= 100 && clickX <= 200 && clickY >= 557 && clickY <= 657) {
                if (!obj.animationGetMoneyPlay) isLeftButtonPressed = true;
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
                if (!obj.animationGetMoneyPlay) currentDiver.moveLeft();
            } else if (clickX >= 1240 && clickX <= 1340 && clickY >= 557 && clickY <= 657) {
                isRightButtonPressed = false;
                currentDiver.moveRight();
            }
        }
    });
    
    var onBoatCount = 0;
    var bagEmptyCount = 0;
    var isBagEmptyAnim = false;
    var octopusMoveSteps = 0;

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
        
        if (octopusMoveSteps == 20 || octopusMoveSteps == 40 || octopusMoveSteps == 60 || octopusMoveSteps == 80 || octopusMoveSteps == 100) {
            octopus.move();
        }

        if (octopusMoveSteps == 100) {
            octopusMoveSteps = 0;
        }

        octopusMoveSteps++;

        var firstTentacle = octopus.getFirstTentacle();
        ctx.drawImage(firstTentacle['image'], firstTentacle['x'], firstTentacle['y'], firstTentacle['width'], firstTentacle['height']);
        var secondTentacle = octopus.getSecondTentacle();
        ctx.drawImage(secondTentacle['image'], secondTentacle['x'], secondTentacle['y'], secondTentacle['width'], secondTentacle['height']);
        var thirdTentacle = octopus.getThirdTentacle();
        ctx.drawImage(thirdTentacle['image'], thirdTentacle['x'], thirdTentacle['y'], thirdTentacle['width'], thirdTentacle['height']);
        var fourthTentacle = octopus.getFourthTentacle();
        ctx.drawImage(fourthTentacle['image'], fourthTentacle['x'], fourthTentacle['y'], fourthTentacle['width'], fourthTentacle['height']);
        var fifthTentacle = octopus.getFifthTentacle();
        ctx.drawImage(fifthTentacle['image'], fifthTentacle['x'], fifthTentacle['y'], fifthTentacle['width'], fifthTentacle['height']);
        

        var digits = ui.getDigits();
        for (let key of Object.keys(digits)) {
            var digit = digits[key];
            ctx.drawImage(digit['image'], digit['x'], digit['y'], digit['width'], digit['height']);
        }

        if (currentDiver.getIsOnBoatWithBag()) {
            isBagEmptyAnim = true;
        }
        if (isBagEmptyAnim) {
            bagEmptyCount++;
        }
        if (bagEmptyCount == 12 || bagEmptyCount == 20 || bagEmptyCount == 30) {
            currentDiver.bagAnimationMovement();
            ui.addScore();
            if (bagEmptyCount == 30) {
                isBagEmptyAnim = false;
                bagEmptyCount = 0;
            }
        }

        if (onBoatCount == 250) {
            currentDiver.moveRight();
        }
        if (currentDiver.getIsOnBoat()) {
            onBoatCount++;
        } else {
            onBoatCount = 0;
        }
    }, 20);
}

main();
