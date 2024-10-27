class UI {
    #score;
    #digits;
    #allDigits;
    #noneDigit;
    #buttons;
    #background;
    #firstBackground;
    #gameALabel;
    #gameBLabel;
    #currentGameLabel;
    #twoPoints;
    #clock;
    #alarm;
    #alarmLabels;
    #miniOctopusLabel;

    #am;
    #pm;

    #alarmAudio;


    constructor() {
        this.#score = 0;

        this.#clock = {
            isPm: false,
            hours: 12,
            minutes: 0
        };

        this.#alarm = {
            isPm: true,
            hours: 12,
            minutes: 0
        };

        const am = new Image();
        am.src = './спрайты/интерфейс/дп.png';
        this.#am = {'x': 605, 'y': 205, 'width': 50, 'height': 25, 'image': am };
        const pm = new Image();
        pm.src = './спрайты/интерфейс/пп.png';
        this.#pm = {'x': 605, 'y': 240, 'width': 50, 'height': 25, 'image': pm };

        const digit1 = new Image();
        digit1.src = './спрайты/интерфейс/0.png';
        const digit2 = new Image();
        digit2.src = './спрайты/интерфейс/-1.png';
        this.#noneDigit = digit2;
        this.#digits = {
            0: {'x': 830, 'y': 205, 'width': 40, 'height': 65, 'image': digit1}, 
            1: {'x': 782, 'y': 205, 'width': 40, 'height': 65, 'image': digit2},
            2: {'x': 715, 'y': 205, 'width': 40, 'height': 65, 'image': digit2},
            3: {'x': 668, 'y': 205, 'width': 40, 'height': 65, 'image': digit2}
        };

        this.#allDigits = [];
        let allDigitsCount = 9;
        for (let i = 0; i <= allDigitsCount; i++) {
            const digit = new Image();
            digit.src = `./спрайты/интерфейс/${i}.png`;
            this.#allDigits.push(digit);
        }

        const pressedButton = new Image();
        pressedButton.src = "./спрайты/интерфейс/нажатая кнопка.png"; 
        const pressedChooseButton = new Image();
        pressedChooseButton.src = './спрайты/интерфейс/нажатая кнопка выбора.png';
        const pressedTimeAlarmButton = new Image();
        pressedTimeAlarmButton.src = './спрайты/интерфейс/нажатая кнопка (время).png';
        this.#buttons = {
            left: { 'x': 100, 'y': 557, 'width': 100, 'height': 100, 'image': pressedButton },
            right: { 'x': 1240, 'y': 557, 'width': 100, 'height': 100, 'image': pressedButton },
            gameA: {'x': 1212, 'y': 82, 'width': 70, 'height': 35, 'image': pressedChooseButton},
            gameB: {'x': 1212, 'y': 180, 'width': 70, 'height': 35, 'image': pressedChooseButton},
            time: {'x': 1212, 'y': 278, 'width': 70, 'height': 35, 'image': pressedChooseButton},
            alarm: {'x': 1330, 'y': 135, 'width': 30, 'height': 30, 'image': pressedTimeAlarmButton},
            reset: {'x': 1330, 'y': 240, 'width': 30, 'height': 30, 'image': pressedTimeAlarmButton}
        };

        const background = new Image();
        background.src = './спрайты/фон.png';
        this.#background = background;

        const firstBackground = new Image();
        firstBackground.src = './спрайты/первоначальный фон.png';
        this.#firstBackground = firstBackground;

        const gameA = new Image();
        gameA.src = './спрайты/интерфейс/игра а.png';
        this.#gameALabel = { 'x': 390, 'y': 545, 'width': 100, 'height': 30, 'image': gameA};

        const gameB = new Image();
        gameB.src = './спрайты/интерфейс/игра б.png';
        this.#gameBLabel = { 'x': 390, 'y': 580, 'width': 100, 'height': 30, 'image': gameB};

        this.#currentGameLabel = this.#gameALabel;

        const twoPoints = new Image();
        twoPoints.src = './спрайты/интерфейс/двоеточие.png';
        this.#twoPoints = { 'x': 760, 'y': 210, 'width': 20, 'height': 50, 'image': twoPoints };

        this.#alarmAudio = new Audio('./звуки/будильник.mp4');

        const topLightning = new Image();
        topLightning.src = './спрайты/интерфейс/верхняя молния.png';
        const bottomLightning = new Image();
        bottomLightning.src = './спрайты/интерфейс/нижняя молния.png';
        const note = new Image();
        note.src = './спрайты/интерфейс/нота.png';
        const miniOctopusLabel = new Image();
        miniOctopusLabel.src = './спрайты/интерфейс/маленький осьминог.png';
        this.#miniOctopusLabel = {'x': 960, 'y': 210, 'width': 95, 'height': 90, 'image': miniOctopusLabel};
        this.#alarmLabels = {
            top: {'x': 905, 'y': 195, 'width': 50, 'height': 25, 'image': topLightning},
            bottom: {'x': 910, 'y': 270, 'width': 45, 'height': 20, 'image': bottomLightning},
            note: {'x': 912, 'y': 230, 'width': 35, 'height': 25, 'image': note},
        };
    }

    #getDigitsFromObj(obj) {
        let str = String(obj.hours)+String(obj.minutes).padStart(2, '0');
        this.#translateDigits(str);
        return this.#digits;
    }

    get time() {
        return this.#getDigitsFromObj(this.#clock);
    }

    get alarmTime() {
        return this.#getDigitsFromObj(this.#alarm);
    }

    set hours(h) {
        if (h >= 1 && h <= 12) {
            this.#clock.hours = h;
        }
    }

    set minutes(m) {
        if (m >= 0 && m <= 59) {
            this.#clock.minutes = m;
        }
    }

    set alarmHours(h) {
        if (h >= 1 && h <= 12) {
            this.#alarm.hours = h;
        }
    }

    set alarmMinutes(m) {
        if (m >= 0 && m <= 59) {
            this.#alarm.minutes = m;
        }
    }

    #addMinute(obj) {
        if (obj.minutes == 59) {
            this.#addHour(obj);
            obj.minutes = -1;
        }
        obj.minutes += 1
    }

    addMinute() {
        this.#addMinute(this.#clock);
    }

    addAlarmMinute() {
       this.#addMinute(this.#alarm);
    }

    #addHour(obj) {
        if (obj.hours == 11) {
            if (obj.isPm) {
                obj.isPm = false;
            } else {
                obj.isPm = true;
            }
        } else if (obj.hours == 12) {
            obj.hours = 0;
        }
        obj.hours += 1;
    }

    addHour() {
        this.#addHour(this.#clock);
    }

    addAlarmHour() {
        this.#addHour(this.#alarm);
    }

    checkAlarm() {
        return this.#clock.hours == this.#alarm.hours && 
        this.#clock.minutes == this.#alarm.minutes
         && this.#clock.isPm == this.#alarm.isPm;
    }

    alarmSoundPlay() {
        this.#alarmAudio.play();
    }

    get timeIndicator() {
        if (this.#clock.isPm) {
            return this.#pm;
        }
        return this.#am;
    }

    get alarmIndicator() {
        if (this.#alarm.isPm) {
            return this.#pm;
        }
        return this.#am;
    }

    get digits() {
        return this.#digits;
    }

    get background() {
        return this.#background;
    }

    get firstBackground() {
        return this.#firstBackground;
    }

    #translateDigits(value) {
        let str = String(value);
        for (let i = 0; i < str.length; i++) {
            this.#digits[str.length-1-i]['image'] = this.#allDigits[str[i]];
        }
        for (let i = str.length; i < Object.keys(this.#digits).length; i++) {
            this.#digits[i]['image'] = this.#noneDigit;
        }
    }

    addScore() {
        if (this.#score < 999) {
            this.#score++;
            this.#translateDigits(this.#score);
        }
    }

    set score(score) {
        if (score >= 0 && score <= 999) {
            this.#score = score;
            this.#translateDigits(this.#score);
        } else {
            this.#score = 0;
        }
    }

    get score() {
        return this.#score;
    }

    get pressedButtonLeft() {
        return this.#buttons.left;
    }
    
    get pressedButtonRight() {
        return this.#buttons.right;
    }

    get pressedGameAButton() {
        return this.#buttons.gameA;
    }

    get pressedGameBButton() {
        return this.#buttons.gameB;
    }

    get pressedTimeButton() {
        return this.#buttons.time;
    }

    get pressedAlarmButton() {
        return this.#buttons.alarm;
    }

    get pressedResetButton() {
        return this.#buttons.reset;
    }

    get gameLabel() {
        return this.#currentGameLabel;
    }

    get twoPoints() {
        return this.#twoPoints;
    }

    setGameA() {
        this.#currentGameLabel = this.#gameALabel;
    }

    setGameB() {
        this.#currentGameLabel = this.#gameBLabel;
    }

    get alarmSignalLabels() {
        return [this.#alarmLabels.top, this.#alarmLabels.bottom, this.#alarmLabels.note];
    }

    get miniOctopusLabel() {
        return this.#miniOctopusLabel;
    }

    get noteLabel() {
        return this.#alarmLabels.note;
    }
}