const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var divider = 1.5; // для масштаба исходный canvas был 1440 на 810, пришлось уменьшить

// игровые флаги (режимы)
const gameParams = {
    isGame: false, // отвечает за проигрывание действий, связанных с игрой и демонстрацией игры
    isTime: false, // просмотр времени
    isAlarm: false, // просмотр времени будильника
    isChangeTime: true, // режим сброса (изменения времени)
    isChangeAlarm: false, // режим изменения будильника

    delay: 20,
    alramPlayDelay: 1000,
    isReappearance: false,
    isAlarmIntervalPlay: false,
    changeTimeStep: 0,
    changeTimeBorder: 3000,
    resetAllFlags() {
        this.isGame = false;
        this.isTime = false;
        this.isAlarm = false;
        this.isChangeTime = false;
        this.isChangeAlarm = false;
    },
    setChangeAlarm() {
        this.resetAllFlags();
        this.isGame = true;
        this.isChangeAlarm = true;
    },
    setChangeTime() {
        this.resetAllFlags();
        this.isChangeTime = true;
    },
    setIsTime() {
        this.resetAllFlags();
        this.isGame = true;
        this.isTime = true;
    },
    setIsGame() {
        this.resetAllFlags();
        this.isGame = true;
    },
    setIsAlarm() {
        this.isAlarm = true;
    },
    isGameAOrB() {
        return !this.isAlarm && !this.isTime && !this.isChangeAlarm && !this.isChangeTime;
    },
    isDemo() {
        return this.isTime || this.isAlarm || this.isChangeAlarm;
    },
    isAlarmTime() {
        return this.isChangeAlarm || this.isAlarm;
    }, 
    isClockTime() {
        return this.isChangeTime || this.isTime;
    },
};

var ui = new UI();
var background = ui.firstBackground;
var currentGameLabel = ui.gameLabel;
var twoPoints = ui.twoPoints;
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
                if (gameParams.isGameAOrB()) {
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
            if (!gameParams.isTime) {
                ui.addScore();
                if (gameParams.isGameAOrB()) {
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
    border: 14,
    // передвижение щупальцев
    animate() {
        if (this.counter >= this.border) {
            octopus.move();
            if (gameParams.isGameAOrB()) {
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
            if (gameParams.isGameAOrB()) {
                thirdDiver.catchedSound();
            }
        }
        if (this.counter >= this.border && currentDiver.alive) {
            this.counter = 0;
            this.flag = false;
            if (gameParams.isDemo()) {
                startDivers();
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
            if (gameParams.isGameAOrB() && !this.flag) {
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
    flag: false,
    isPlaySound: true,
    isShowLabels: true,
    isShowNote: false,
    isShowMiniOctopus: false,
    alarmSignalLabels: ui.alarmSignalLabels,
    draw() {
        if (this.isShowLabels && this.flag) {
            for (let label of this.alarmSignalLabels) {
                ctx.drawImage(label['image'], label['x'], label['y'],
                    label['width'], label['height']);
            }
        }
    },
    sound() {
        if (gameParams.isDemo() && this.flag && this.isPlaySound && (gameParams.isAlarm || gameParams.isTime)) {
            ui.alarmSoundPlay();
            if (!this.isShowLabels) {
                this.isShowLabels = true;
            } else {
                this.isShowLabels = false;
            }
        }
    },
    setStartParams() {
        this.flag = false;
        this.isPlaySound = true;
        this.isShowLabels = false;
        this.counter = 0;
    },
    hideNoteAndMiniOctopus() {
        this.isShowMiniOctopus = false;
        this.isShowNote = false;
    },
    showNoteAndMiniOctopus() {
        this.isShowMiniOctopus = true;
        this.isShowNote = true;
    },
    animate() {
        if (ui.checkAlarm() && this.isPlaySound) {
            this.flag = true;
            this.isShowMiniOctopus = true;
            this.isShowNote = false;
        }
        if (this.flag) {
            this.counter++;
        }
        if (this.counter >= this.border) {
            this.setStartParams();
            this.isShowMiniOctopus = false;
            this.isShowNote = true;
        }
    }
};

// проигрывание демонстрации
const demoAnim = {
    counter: 0,
    divider: 56,
    animate() {
        if (gameParams.isDemo()) {
            this.counter++;
            if ((this.counter % this.divider == 0) && !catchedByOctopus.flag && !collision.flag) {
                if (ui.score == 0)
                    currentDiver.moveRight();
                else 
                    currentDiver.moveLeft();
                if (currentDiver.isGetMoneyPos() && !getMoneyAnim.flag && !collision.flag) {
                    getMoneyAnim.flag = true;
                }
            }
        }
    }
};
var animations = [getMoneyAnim, octopusMovementParams, collision, catchedByOctopus, bagEmpty, onBoatParams, alarmPlayParams, demoAnim];

// поведение при нажатии левой красной кнопки
const leftButton = {
    coords: {
        xLeft: 100 / divider, 
        xRight: 200 / divider,
        yTop: 557 / divider,
        yBottom: 657 / divider,
    },
    flag: false,
    drawingObj: ui.pressedButtonLeft,
    setFlags() {
        this.flag = true;
    },
    action() {
        this.flag = false;
        if (!getMoneyAnim.flag && !catchedByOctopus.flag && !bagEmpty.flag && !collision.flag
             && gameParams.isGameAOrB()) {
            currentDiver.moveLeft();
        }
        if (gameParams.isChangeTime) {
            ui.addHour();
        }
        if (gameParams.isChangeAlarm) {
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
        xLeft: 1240 / divider,
        xRight: 1340 / divider,
        yTop: 557 / divider,
        yBottom: 657 / divider,
    },
    flag: false,
    drawingObj: ui.pressedButtonRight,
    setFlags() {
        this.flag = true;
    },
    action() {
        this.flag = false;
        if (!catchedByOctopus.flag && !bagEmpty.flag && !collision.flag && gameParams.isGameAOrB()) {
            currentDiver.moveRight();
        }
        if (gameParams.isChangeTime) {
            ui.addMinute();
        }
        if (gameParams.isChangeAlarm) {
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
        xLeft: 1212 / divider,
        xRight: 1282 / divider,
        yTop: 82 / divider,
        yBottom: 117 / divider,
    },
    flag: false,
    drawingObj: ui.pressedGameAButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (gameParams.isChangeAlarm) {
            ui.setStartAlarm();
        }
        if (gameParams.isChangeTime) {
            ui.setStartClock();
        }
        this.flag = false;
        ui.setGameA();
        currentGameLabel = ui.gameLabel;
        octopusMovementParams.border = 14;
        restart();
        gameParams.setIsGame();
        alarmPlayParams.hideNoteAndMiniOctopus();
        octopus.moveB = false;
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
        xLeft: 1212 / divider,
        xRight: 1282 / divider,
        yTop: 180 / divider,
        yBottom: 215 / divider,
    },
    flag: false,
    drawingObj: ui.pressedGameBButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (gameParams.isChangeAlarm) {
            ui.setStartAlarm();
        }
        if (gameParams.isChangeTime) {
            ui.setStartClock();
        }
        this.flag = false;
        ui.setGameB();
        currentGameLabel = ui.gameLabel;
        octopusMovementParams.border = 9;
        restart();
        gameParams.setIsGame();
        octopus.moveB = true;
        alarmPlayParams.hideNoteAndMiniOctopus();
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
        xLeft: 1212 / divider,
        xRight: 1282 / divider,
        yTop: 278 / divider,
        yBottom: 313 / divider,
    },
    flag: false,
    drawingObj: ui.pressedTimeButton,
    setFlags() {
        this.flag = true;
        if (gameParams.isChangeAlarm) {
            alarmPlayParams.setStartParams();
        }
        gameParams.setIsAlarm();
    },
    action() {
        this.flag = false;
        alarmPlayParams.isShowNote = true;
        if (!gameParams.isTime) {
            restart();
        }
        gameParams.setIsTime();
        alarmPlayParams.isShowMiniOctopus = false;
        octopusMovementParams.border = 14;
        if (alarmPlayParams.flag) {
            alarmPlayParams.isPlaySound = false;
            alarmPlayParams.isShowNote = true;
            alarmPlayParams.isShowLabels = false;
        }
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
        xLeft: 1330 / divider,
        xRight: 1360 / divider,
        yTop: 135 / divider,
        yBottom: 165 / divider,
    },
    flag: false,
    drawingObj: ui.pressedAlarmButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        if (gameParams.isChangeTime) {
            ui.setStartClock();
        }
        this.flag = false;
        if (!gameParams.isChangeAlarm) {
            restart();
        }
        gameParams.setChangeAlarm();
        alarmPlayParams.showNoteAndMiniOctopus();
        octopusMovementParams.border = 14;
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
        xLeft: 1330 / divider,
        xRight: 1360 / divider,
        yTop: 240 / divider,
        yBottom: 270 / divider,
    },
    flag: false,
    drawingObj: ui.pressedResetButton,
    setFlags() {
        this.flag = true;
    },
    action() {
        ui.setStartClock();
        ui.setStartAlarm();
        this.flag = false;
        restart();
        gameParams.setChangeTime();
        alarmPlayParams.setStartParams();
        alarmPlayParams.hideNoteAndMiniOctopus();
        background = ui.firstBackground;
        octopusMovementParams.border = 14;
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

function startDivers() {
    divers[1].alive = true;
    divers[1].currentInd = 0;
    divers[2].alive = true;
    divers[2].currentInd = 1;
    divers[0].alive = true;
    divers[0].currentInd = 2;
    ui.score = 0;
}

// функция перезапуска
function restart() {
    background = ui.background;
    startDivers();
    for (let i = 0; i < animations.length; i++) {
        animations[i].flag = false;
        animations[i].counter = 0;
    }
    octopus = new Octopus();
}

window.addEventListener('keyup', function(event) {
    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        leftButton.action();
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        rightButton.action();
    } else if (event.key == '1') {
        gameAButton.action();
    } else if (event.key == '2') {
        gameBButton.action();
    } else if (event.key == '3') {
        timeButton.action();
    } else if (event.key == '4') {
        alarmButton.action();
    } else if (event.key == '5') {
        resetButton.action();
    }
});

window.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
        leftButton.setFlags();
    } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        rightButton.setFlags();
    } else if (event.key == '1') {
        gameAButton.setFlags();
    } else if (event.key == '2') {
        gameBButton.setFlags();
    } else if (event.key == '3') {
        timeButton.setFlags();
    } else if (event.key == '4') {
        alarmButton.setFlags();
    } else if (event.key == '5') {
        resetButton.setFlags();
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
    if (!gameParams.isAlarmIntervalPlay) {
        gameParams.isAlarmIntervalPlay = true;
        setInterval(function() {
            alarmPlayParams.sound();
        }, gameParams.alramPlayDelay);
    }
});

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    alarmPlayParams.draw();

    if (alarmPlayParams.isShowNote) {
        ctx.drawImage(noteLabel['image'], noteLabel['x'], noteLabel['y'],
            noteLabel['width'], noteLabel['height']);
    }
    if (alarmPlayParams.isShowMiniOctopus) {
        ctx.drawImage(miniOctopusLabel['image'], miniOctopusLabel['x'], miniOctopusLabel['y'],
            miniOctopusLabel['width'], miniOctopusLabel['height']);
    }

    // отрисовка нажатых кнопок
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].flag) {
            buttons[i].draw();
        }
    }

    if (gameParams.isGame) {
        if (gameParams.isGameAOrB()) {
            ctx.drawImage(
                currentGameLabel['image'], currentGameLabel['x'], currentGameLabel['y'],
                currentGameLabel['width'], currentGameLabel['height']
            );
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
        if ((score == 200 || score == 500) && !gameParams.isReappearance) {
            divers[1].alive = true;
            divers[1].currentInd = 0;
            divers[2].alive = true;
            divers[2].currentInd = 1;
            gameParams.isReappearance = true;
        } else if (score != 200 && score != 500){
            gameParams.isReappearance = false;
        }
    }

    // отсчитывание времени
    if (!gameParams.isChangeTime) {
        gameParams.changeTimeStep++;
    }
    if (gameParams.changeTimeStep == gameParams.changeTimeBorder) {
        gameParams.changeTimeStep = 0;
        ui.addMinute();
    }

    // отрисовка цифр
    var digits;
    let middayInd;
    if (gameParams.isAlarmTime()) {
        digits = ui.alarmTime;
        middayInd = ui.alarmIndicator;
    } else if (gameParams.isClockTime()) {
        digits = ui.time;
        middayInd = ui.timeIndicator;
    } else {
        digits = ui.digits;
    }
    if (!gameParams.isGameAOrB()) {
        ctx.drawImage(middayInd['image'], middayInd['x'], middayInd['y'], middayInd['width'], middayInd['height']);
        ctx.drawImage(twoPoints['image'], twoPoints['x'], twoPoints['y'], twoPoints['width'], twoPoints['height']);
    }
    for (let key of Object.keys(digits)) {
        var digit = digits[key];
        ctx.drawImage(digit['image'], digit['x'], digit['y'], digit['width'], digit['height']);
    }
}, gameParams.delay);
