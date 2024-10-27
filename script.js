const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var isGame = false;
var isTime = false;
var isAlarm = false;
var isChangeTime = true;
var isChangeAlarm = false;

var isShowNote = false;
var isShowMiniOctopus = false;

var delay = 20;
var isReappearance = false;

var isIntervalPlay = false;

var demoCounter = 0;
var demoMoveRight = true;
var changeTimeStep = 0;

var ui = new UI();
var background = ui.firstBackground;
var currentGameLabel = ui.gameLabel;
var twoPoints = ui.twoPoints;
var alarmSignalLabels = ui.alarmSignalLabels;
var miniOctopusLabel = ui.miniOctopusLabel;
var noteLabel = ui.noteLabel;

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
                if (!isAlarm && !isTime && !isChangeAlarm) {
                    currentDiver.moneySound();
                }
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
    border: 45,
    divider: 15,
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
            if (!isTime) {
                ui.addScore();
                if (!isAlarm && !isTime && !isChangeAlarm) {
                    currentDiver.moneySound();
                }
            } else {
                ui.score = 0;
            }
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
            if (!isAlarm && !isTime && !isChangeAlarm) {
                octopus.moveSound();
            }
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
    border: 210,
    divider: 30,
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
            if (!isAlarm && !isTime && !isChangeAlarm) {
                thirdDiver.catchedSound();
            }
        }
        if (this.counter >= this.border && currentDiver.alive) {
            this.counter = 0;
            this.flag = false;
            if (isTime || isAlarm || isChangeAlarm) {
                divers[1].alive = true;
                divers[1].currentInd = 0;
                divers[2].alive = true;
                divers[2].currentInd = 1;
                divers[0].alive = true;
                divers[0].currentInd = 2;
                ui.score = 0;
            }
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
            if (!isAlarm && !isTime && !isChangeAlarm && !this.flag) {
                thirdDiver.collisionSound();
            }
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

// отвечает за проигрывание будильника
const alarmPlayParams = {
    counter: 0,
    border: 3000,
    divider: 50,
    flag: false,
    isPlaySound: true,
    isShowLabels: true,
    draw() {
        if (this.isShowLabels && this.flag) {
            for (let label of alarmSignalLabels) {
                ctx.drawImage(label['image'], label['x'], label['y'],
                    label['width'], label['height']);
            }
        }
    },
    sound() {
        if ((isChangeTime || isAlarm || isTime) && this.flag) {
            if (this.counter % this.divider == 0 && this.isPlaySound) {
                ui.alarmSoundPlay();
                if (!this.isShowLabels) {
                    this.isShowLabels = true;
                } else {
                    this.isShowLabels = false;
                }
            }
        }
    },
    animate() {
        if (ui.checkAlarm()) {
            this.flag = true;
            isShowMiniOctopus = true;
            isShowNote = false;
        }
        if (!this.isPlaySound) {
            isShowMiniOctopus = false;
            isShowNote = true;
        } 
        if (this.flag) {
            this.counter++;
        }
        if (this.counter >= this.border) {
            this.flag = false;
            this.isPlaySound = true;
            this.isShowLabels = false;
            this.counter = 0;
            isShowMiniOctopus = false;
            isShowNote = true;
        }
    }
};
var animations = [getMoneyAnim, octopusMovementParams, collision, catchedByOctopus, bagEmpty, onBoatParams, alarmPlayParams];

// поведение при нажатии левой красной кнопки
const leftButton = {
    coords: {
        xLeft: 100, 
        xRight: 200,
        yTop: 557,
        yBottom: 657,
    },
    flag: false,
    drawingObj: ui.pressedButtonLeft,
    setFlags() {
        this.flag = true;
    },
    action() {
        this.flag = false;
        if (!getMoneyAnim.flag && !catchedByOctopus.flag && !bagEmpty.flag && !collision.flag
             && !isTime && !isAlarm && !isChangeAlarm && !isChangeTime) {
            currentDiver.moveLeft();
        }
        if (isChangeTime) {
            ui.addHour();
        }
        if (isChangeAlarm) {
            ui.addAlarmHour();
        }
    },
    draw() {
        ctx.drawImage(this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
            this.drawingObj['width'], this.drawingObj['height']);
    }
}

// поведение при нажатии правой красной кнопки
const rightButton = {
    coords: {
        xLeft: 1240,
        xRight: 1340,
        yTop: 557,
        yBottom: 657,
    },
    flag: false,
    drawingObj: ui.pressedButtonRight,
    setFlags() {
        this.flag = true;
    },
    action() {
        this.flag = false;
        if (!catchedByOctopus.flag && !bagEmpty.flag && !collision.flag && !isTime
             && !isAlarm && !isChangeAlarm && !isChangeTime) {
            currentDiver.moveRight();
        }
        if (isChangeTime) {
            ui.addMinute();
        }
        if (isChangeAlarm) {
            ui.addAlarmMinute();
        }
    }, 
    draw() {
        ctx.drawImage(
            this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
            this.drawingObj['width'], this.drawingObj['height']
        );
        if (currentDiver.isGetMoneyPos() && !getMoneyAnim.flag && !collision.flag) {
            getMoneyAnim.flag = true;
        }
    }
};

// поведение при нажатии кнопки "Игра А"
const gameAButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 82,
        yBottom: 117,
    },
    flag: false,
    drawingObj: ui.pressedGameAButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (isChangeAlarm) {
            ui.alarmHours = 12;
            ui.alarmMinutes = 0;
        }
        if (isChangeTime) {
            ui.hours = 12;
            ui.minutes = 0;
        }
        this.flag = false;
        ui.setGameA();
        currentGameLabel = ui.gameLabel;
        octopusMovementParams.border = 12;
        restart();
        isTime = false;
        isAlarm = false;
        isChangeTime = false;
        isChangeAlarm = false;
        octopus.moveB = false;
        isShowMiniOctopus = false;
        isShowNote = false;
    },
    draw() {
        ctx.drawImage(
            this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
            this.drawingObj['width'], this.drawingObj['height']
        );
    }
}

// поведение при нажатии кнопки "Игра Б"
const gameBButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 180,
        yBottom: 215,
    },
    flag: false,
    drawingObj: ui.pressedGameBButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (isChangeAlarm) {
            ui.alarmHours = 12;
            ui.alarmMinutes = 0;
        }
        if (isChangeTime) {
            ui.hours = 12;
            ui.minutes = 0;
        }
        this.flag = false;
        ui.setGameB();
        currentGameLabel = ui.gameLabel;
        octopusMovementParams.border = 6;
        restart();
        isTime = false;
        isAlarm = false;
        isChangeTime = false;
        isChangeAlarm = false;
        octopus.moveB = true;
        isShowMiniOctopus = false;
        isShowNote = false;
    },
    draw() {
        ctx.drawImage(
            this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
            this.drawingObj['width'], this.drawingObj['height']
        );
    }
}

// поведение при нажатии кнопки "Время"
const timeButton = {
    coords: {
        xLeft: 1212,
        xRight: 1282,
        yTop: 278,
        yBottom: 313,
    },
    flag: false,
    drawingObj: ui.pressedTimeButton,
    setFlags() {
        this.flag = true;
        isAlarm = true;
    },
    action() {
        this.flag = false;
        if(isGame) {
            isShowNote = true;
        }
        if (!isTime) {
            restart();
        }
        isAlarm = false;
        isTime = true;
        isChangeTime = false;
        isChangeAlarm = false;
        octopusMovementParams.border = 12;
        if (alarmPlayParams.flag) {
            alarmPlayParams.isPlaySound = false;
            alarmPlayParams.isShowLabels = false;
        }
        isShowMiniOctopus = false;
    }, draw() {
        ctx.drawImage(
            this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
            this.drawingObj['width'], this.drawingObj['height']
        );
    }
}

// поведение при нажатии кнопки установки времени будильника
const alarmButton = {
    coords: {
        xLeft: 1330,
        xRight: 1360,
        yTop: 135,
        yBottom: 165,
    },
    flag: false,
    drawingObj: ui.pressedAlarmButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (isChangeTime) {
            ui.hours = 12;
            ui.minutes = 0;
        }
        this.flag = false;
        isAlarm = false;
        isTime = false;
        isChangeTime = false;
        if (!isChangeAlarm) {
            restart();
        }
        isChangeAlarm = true;
        octopusMovementParams.border = 12;
        alarmPlayParams.counter = 0;
        alarmPlayParams.flag = false;
        alarmPlayParams.isPlaySound = true;
        alarmPlayParams.isShowLabels = false;
        isShowMiniOctopus = true;
        isShowNote = true;
    }, 
    draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
        }
    }
};

// поведение при нажатии кнопки сброса
const resetButton = {
    coords: {
        xLeft: 1330,
        xRight: 1360,
        yTop: 240,
        yBottom: 270,
    },
    flag: false,
    drawingObj: ui.pressedResetButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        ui.hours = 12;
        ui.minutes = 0;
        ui.alarmHours = 12;
        ui.alarmMinutes = 0;
        this.flag = false;
        isAlarm = false;
        isTime = false;
        isChangeTime = true;
        restart();
        isGame = false;
        isChangeAlarm = false;
        background = ui.firstBackground;
        octopusMovementParams.border = 12;
        if (alarmPlayParams.flag) {
            alarmPlayParams.isPlaySound = false;
            alarmPlayParams.isShowLabels = false;
        }
        isShowMiniOctopus = false;
        isShowNote = false;
    }, draw() {
        if (this.flag) {
            ctx.drawImage(
                this.drawingObj['image'], this.drawingObj['x'], this.drawingObj['y'],
                this.drawingObj['width'], this.drawingObj['height']
            );
        }
    }
}
var buttons = [leftButton, rightButton, gameAButton, gameBButton, timeButton, alarmButton, resetButton];

// функция перезапуска
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

window.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        if (!getMoneyAnim.flag && !catchedByOctopus.flag && !bagEmpty.flag && !collision.flag &&
             !isTime && !isAlarm && !isChangeAlarm && !isChangeTime) {
            currentDiver.moveLeft();
        }
        leftButton.flag = false;
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        if (!catchedByOctopus.flag && !bagEmpty.flag && !collision.flag &&
             !isTime && !isAlarm && !isChangeAlarm && !isChangeTime) {
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
                buttons[i].setFlags();
            }   
        }
    }
});

window.addEventListener('mouseup', function(event) {
    if (event.which == 1) {
        for(let i = 0; i < buttons.length; i++) {
            if (buttons[i].flag) {
                buttons[i].action();
            }
        }
    }
    if (!isIntervalPlay) {
        isIntervalPlay = true;
        setInterval(function() {
            alarmPlayParams.sound();
        }, delay);
    }
});

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    alarmPlayParams.draw();

    if (isShowNote) {
        ctx.drawImage(noteLabel['image'], noteLabel['x'], noteLabel['y'],
            noteLabel['width'], noteLabel['height']);
    }
    if (isShowMiniOctopus) {
        ctx.drawImage(miniOctopusLabel['image'], miniOctopusLabel['x'], miniOctopusLabel['y'],
            miniOctopusLabel['width'], miniOctopusLabel['height']);
    }

    // отрисовка нажатых кнопок
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].flag) {
            buttons[i].draw();
        }
    }

    if (isGame) {
        if (!isTime && !isAlarm && !isChangeAlarm) {
            ctx.drawImage(
                currentGameLabel['image'], currentGameLabel['x'], currentGameLabel['y'],
                currentGameLabel['width'], currentGameLabel['height']
            );
        }

        // проигрывание демонстрации
        if (isTime || isAlarm || isChangeAlarm) {
            demoCounter++;
            if ((demoCounter % 56 == 0) && !catchedByOctopus.flag && !collision.flag) {
                if (ui.score == 0)
                    currentDiver.moveRight();
                else 
                    currentDiver.moveLeft();
                if (currentDiver.isGetMoneyPos() && !getMoneyAnim.flag && !collision.flag) {
                    getMoneyAnim.flag = true;
                }
            }
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

        // различные анимации
        for (let i = 0; i < animations.length; i++) {
            animations[i].animate();
        }

        // отрисовка щупальцев
        var tentacles = octopus.tentacles;
        for (let tentacle of tentacles) {
            ctx.drawImage(tentacle['image'], tentacle['x'], tentacle['y'], tentacle['width'], tentacle['height']);
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
    }

    if (!isChangeTime)
        changeTimeStep++;
        if (changeTimeStep == 3000) {
            changeTimeStep = 0;
            ui.addMinute();
        }

    // отрисовка цифр
    var digits;
    let middayInd;
    if (isChangeAlarm || isAlarm) {
        digits = ui.alarmTime;
        middayInd = ui.alarmIndicator;
    } else if (isChangeTime || isTime) {
        digits = ui.time;
        middayInd = ui.timeIndicator;
    } else {
        digits = ui.digits;
    }
    if (isTime || isChangeTime || isAlarm || isChangeAlarm) {
        ctx.drawImage(middayInd['image'], middayInd['x'], middayInd['y'], middayInd['width'], middayInd['height']);
        ctx.drawImage(twoPoints['image'], twoPoints['x'], twoPoints['y'], twoPoints['width'], twoPoints['height']);
    }
    for (let key of Object.keys(digits)) {
        var digit = digits[key];
        ctx.drawImage(digit['image'], digit['x'], digit['y'], digit['width'], digit['height']);
    }
}, delay);
