const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var isGame = false;

var ui = new UI();
var background = ui.firstBackground;
var currentGameLabel = ui.gameLabel;

var octopus = new Octopus();

var currentDiver = new Diver();
currentDiver.setFirst();
var secondDiver = new Diver();
secondDiver.currentInd = 1;
var thirdDiver = new Diver();
var divers = [currentDiver, secondDiver, thirdDiver];

// объект отвечает за смену кадра анимации получения сокровища
const getMoneyAnim = {
    counter: 0,
    flag: false,
    border: 20,
    addMoneyStep: 5, // шаг, при котором начисляются очки
    divider: 5,
    // анимация получения сокровища
    animate() {
        if (this.flag) {
            if (currentDiver.getIsWithBag())
                this.counter++;
            if (this.counter % this.divider == 0) {
                currentDiver.getMoney();
            }
            if (this.counter == this.addMoneyStep) {
                ui.addScore();
            }
            if (this.counter >= this.border) {
                this.counter = 0;
                this.flag = false;
            }
        }
    }
};

// объект отвечает за 5 секундное бездействие игрока
const onBoatParams = {
    counter: 0,
    border: 250,
    // при нахождении дайвера в лодке и при бездействии в течение некоторого времени он самостоятельно покидает лодку
    animate() {
        if (this.counter >= this.border) {
            currentDiver.moveRight();
        }
        if (currentDiver.getIsOnBoat() && !bagEmpty.flag && !catchedByOctopus.flag && !collision.flag) {
            this.counter++;
        } else {
            this.counter = 0;
        }
    }
};

// объект отвечает за смену кадра анимации опустошения мешка
const bagEmpty = {
    counter: 0,
    border: 30,
    divider: 10,
    flag: false,
    // проигрывание анимации при возвращении в лодку с начислением 3х очков
    animate() {
        if (currentDiver.getIsOnBoatWithBag()) {
            this.flag = true;
        }
        if (this.flag) {
            this.counter++;
        } 
        if (this.counter > 0 && this.counter % this.divider == 0) {
            currentDiver.bagAnimationMovement();
            ui.addScore();
            if (this.counter >= this.border) {
                this.flag = false;
                this.counter = 0;
            }
        }
    }
};

// объект отвечает за смену кадра передвижения осьминога
const octopusMovementParams = {
    counter: 0,
    border: 10,
    // передвижение щупальцев
    animate() {
        if (this.counter >= this.border) {
            octopus.move();
            this.counter = 0;
        }
        if (!bagEmpty.flag && !catchedByOctopus.flag && !collision.flag && 
            (getMoneyAnim.counter == 0 || getMoneyAnim.counter > getMoneyAnim.divider)) {
            this.counter++;
        }
    }
}

// объект отвечает за смену кадра анимации "барахтания" дайвера
const catchedByOctopus = {
    counter: 0,
    border: 140,
    divider: 20,
    flag: false,
    // анимация "убийства" дайвера
    animate() {
        if (this.flag) {
            if (this.counter < this.border) {
                this.counter++;
            }
            let diverAttrs = thirdDiver.getCatchedAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
        }
        if (this.counter > 0 && this.counter % this.divider == 0 && this.counter < this.border) {
            thirdDiver.setNextCatchedDiver();
        }
        if (this.counter >= this.border && currentDiver.alive) {
            this.counter = 0;
            this.flag = false;
        }
    }
};

// объект отвечает за паузу в 1 секунду после касания щупальца
const collision = {
    counter: 0,
    border: 50,
    flag: false,
    // коллизия щупальца с дайвером
    animate() {
        if (octopus.checkCollision(currentDiver.currentInd)) {
            this.flag = true;
        }
        if (this.flag) {
            this.counter++;
        }
        if (this.counter >= this.border) {
            this.counter = 0;
            this.flag = false;
            divers[0].setDeath();
            let tmp = divers[0];
            divers[0] = divers[1];
            divers[1] = divers[2];
            divers[2] = tmp;
            divers[1].currentInd = 1;
            if (divers[0].alive) {
                divers[0].setFirst();
            }
            currentDiver = divers[0];
            catchedByOctopus.flag = true;
            octopus.setCollisionPos();
        }
    }
};
var animations = [getMoneyAnim, octopusMovementParams, collision, catchedByOctopus, bagEmpty, onBoatParams];

const leftButton = {
    coords: {
        xLeft: 100, 
        xRight: 200,
        yTop: 557,
        yBottom: 657,
    },
    flag: false,
    drawingObj: ui.pressedButtonLeft,
    action() {
        if (this.flag) {
            this.flag = false;
            if (!getMoneyAnim.flag && !catchedByOctopus.flag && !bagEmpty.flag && !collision.flag) {
                currentDiver.moveLeft();
            }
        }
    },
    draw() {
        if (this.flag) {
            ctx.drawImage(this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']);
        }
    }
}
const rightButton = {
    coords: {
        xLeft: 1240,
        xRight: 1340,
        yTop: 557,
        yBottom: 657,
    },
    flag: false,
    drawingObj: ui.pressedButtonRight,
    action() {
        if (this.flag) {
            this.flag = false;
            if (!catchedByOctopus.flag && !bagEmpty.flag && !collision.flag) {
                currentDiver.moveRight();
            }
        }
    }, 
    draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
            if (currentDiver.isGetMoneyPos() && !getMoneyAnim.flag && !collision.flag) {
                getMoneyAnim.flag = true;
            }
        }
    }
};
const gameAButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 82,
        yBottom: 117,
    },
    flag: false,
    drawingObj: ui.pressedGameAButton,
    action() {
        if (this.flag) {
            this.flag = false;
            ui.setGameA();
            currentGameLabel = ui.gameLabel;
            octopusMovementParams.border = 10;
            restart();
            octopus.moveB = false;
        }
        // ...
    },
    draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
        }
    }
}
const gameBButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 180,
        yBottom: 215,
    },
    flag: false,
    drawingObj: ui.pressedGameBButton,
    action() {
        if (this.flag) {
            this.flag = false;
            ui.setGameB();
            currentGameLabel = ui.gameLabel;
            octopusMovementParams.border = 6;
            restart();
            octopus.moveB = true;
        }
        // ...
    },
    draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
        }
    }
}
const timeButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 278,
        yBottom: 313,
    },
    flag: false,
    drawingObj: ui.pressedTimeButton,
    action() {
        this.flag = false;
        // ...
    }, draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
        }
    }
}
var buttons = [leftButton, rightButton, gameAButton, gameBButton, timeButton];


function restart() {
    background = ui.background;
    isGame = true;
    divers[1].alive = true;
    divers[1].currentInd = 0;
    divers[2].alive = true;
    divers[2].currentInd = 1;
    divers[0].alive = true;
    divers[0].currentInd = 2;
    for (let i = 0; i < animations.length; i++) {
        animations[i].flag = false;
        animations[i].counter = 0;
    }
    octopus = new Octopus();
    ui.score = 0;
}

var delay = 20;
var isReappearance = false;

window.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        if (!getMoneyAnim.flag && !catchedByOctopus.flag && !bagEmpty.flag && !collision.flag) {
            currentDiver.moveLeft();
        }
        leftButton.flag = false;
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        if (!catchedByOctopus.flag && !bagEmpty.flag && !collision.flag) {
            currentDiver.moveRight();
        }
        rightButton.flag = false;
    }

});

window.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        leftButton.flag = true;
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        rightButton.flag = true;
    }
});

window.addEventListener('mousedown', function(event) {
    if (event.which == 1) {
        var rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;
        for(let i = 0; i < buttons.length; i++) {
            if (clickX >= buttons[i].coords.xLeft && clickX <= buttons[i].coords.xRight
                && clickY >= buttons[i].coords.yTop && clickY <= buttons[i].coords.yBottom) {
                buttons[i].flag = true;
            }   
        }
    }
});

window.addEventListener('mouseup', function(event) {
    if (event.which == 1) {
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].action();
        }
    }
});

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (isGame) {
        ctx.drawImage(
            currentGameLabel['image'], currentGameLabel['x'], currentGameLabel['y'],
            currentGameLabel['width'], currentGameLabel['height']
        );
        
        // отрисовка нажатых кнопок
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].draw();
        }

        // отрисовка дайверов
        for (let i = 0; i < divers.length; i++) {
            if (divers[i].alive) {
                let diverAttrs = divers[i].getAttrs();
                ctx.drawImage(
                    diverAttrs['image'], diverAttrs['x'], diverAttrs['y'],
                    diverAttrs['width'], diverAttrs['height']
                );
            }
        }
        
        // отрисовка щупальцев
        var tentacles = octopus.tentacles;
        for (let tentacle of tentacles) {
            ctx.drawImage(tentacle['image'], tentacle['x'], tentacle['y'], tentacle['width'], tentacle['height']);
        }

        // различные анимации
        for (let i = 0; i < animations.length; i++) {
            animations[i].animate();
        }

        // обработка получения 200 и 500 очков с возрождением 
        let score = ui.score;
        if ((score == 200 || score == 500) && !isReappearance) {
            divers[1].alive = true;
            divers[1].currentInd = 0;
            divers[2].alive = true;
            divers[2].currentInd = 1;
            isReappearance = true;
        } else if (score != 200 && score != 500){
            isReappearance = false;
        }

        // отрисовка цифр
        var digits = ui.digits;
        for (let key of Object.keys(digits)) {
            var digit = digits[key];
            ctx.drawImage(digit['image'], digit['x'], digit['y'], digit['width'], digit['height']);
        }
    }
}, delay);
