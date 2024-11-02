class UI {
    /** 
     * @type {number} - очки
     */
    #score;
    /** 
     * @type {Object.<number, Object.<string, any>>} - 4 цифры, которые отображаются в игре
     */
    #digits;
    /** 
     * @type {Image} - все изображения цифр
     */
    #allDigits;
    /**
     * @type {Image} - прозрачная цифра
     */
    #noneDigit;
    /** 
     * @type {Object.<string, Object.<string, any>>} - все кнопки
     */
    #buttons;
    /**
     * @type {Image} - главное изрбражение
     */
    #background;
    /**
     * @type {Image} - главное изображение при сбросе
     */
    #firstBackground;
    /** 
     * @type {Object.<string, any>} - надпись "Игра А"
     */
    #gameALabel;
    /** 
     * @type {Object.<string, any>} - надпись "Игра Б"
     */
    #gameBLabel;
    /** 
     * @type {Object.<string, any>} - текущая надпись об игре
     */
    #currentGameLabel;
    /** 
     * @type {Object.<string, any>} - двоеточие
     */
    #twoPoints;
    /**
     * @type {Object.<string, any>} - объект часов, в котором представлен флаг пп и дп, часы и минуты
     */
    #clock;
    /**
     * @type {Object.<string, any>} - объект будильника, в котором представлен флаг пп и дп, часы и минуты
     */
    #alarm;
    /**
     * @type {Object.<string, Object.<string, any>>} - две молнии, нота и маленький осьминог
     */
    #alarmLabels;
    /**
     * @type {Object.<string, any>} - до полудня
     */
    #am;
    /**
     * @type {Object.<string, any>} - после полудня
     */
    #pm;
    /**
     * @type {Audio} - звук будильника
     */
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

	let divider = 1.5;
        const am = new Image();
        am.src = './спрайты/интерфейс/дп.png';
        this.#am = {'x': 605 / divider, 'y': 205 / divider, 'width': 50 / divider, 'height': 25 / divider, 'image': am };
        const pm = new Image();
        pm.src = './спрайты/интерфейс/пп.png';
        this.#pm = {'x': 605 / divider, 'y': 240 / divider, 'width': 50 / divider, 'height': 25 / divider, 'image': pm };

        const digit1 = new Image();
        digit1.src = './спрайты/интерфейс/0.png';
        const digit2 = new Image();
        digit2.src = './спрайты/интерфейс/-1.png';
        this.#noneDigit = digit2;
        this.#digits = {
            0: {'x': 830 / divider, 'y': 205 / divider, 'width': 40 / divider, 'height': 65 / divider, 'image': digit1}, 
            1: {'x': 782 / divider, 'y': 205 / divider, 'width': 40 / divider, 'height': 65 / divider, 'image': digit2},
            2: {'x': 715 / divider, 'y': 205 / divider, 'width': 40 / divider, 'height': 65 / divider, 'image': digit2},
            3: {'x': 668 / divider, 'y': 205 / divider, 'width': 40 / divider, 'height': 65 / divider, 'image': digit2}
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
            left: { 'x': 100 / divider, 'y': 557 / divider, 'width': 100 / divider, 'height': 100 / divider, 'image': pressedButton },
            right: { 'x': 1240 / divider, 'y': 557 / divider, 'width': 100 / divider, 'height': 100 / divider, 'image': pressedButton },
            gameA: {'x': 1212 / divider, 'y': 82 / divider, 'width': 70 / divider, 'height': 35 / divider, 'image': pressedChooseButton},
            gameB: {'x': 1212 / divider, 'y': 180 / divider, 'width': 70 / divider, 'height': 35 / divider, 'image': pressedChooseButton},
            time: {'x': 1212 / divider, 'y': 278 / divider, 'width': 70 / divider, 'height': 35 / divider, 'image': pressedChooseButton},
            alarm: {'x': 1330 / divider, 'y': 135 / divider, 'width': 30 / divider, 'height': 30 / divider, 'image': pressedTimeAlarmButton},
            reset: {'x': 1330 / divider, 'y': 240 / divider, 'width': 30 / divider, 'height': 30 / divider, 'image': pressedTimeAlarmButton}
        };

        const background = new Image();
        background.src = './спрайты/фон.png';
        this.#background = background;

        const firstBackground = new Image();
        firstBackground.src = './спрайты/первоначальный фон.png';
        this.#firstBackground = firstBackground;

        const gameA = new Image();
        gameA.src = './спрайты/интерфейс/игра а.png';
        this.#gameALabel = { 'x': 390 / divider, 'y': 545 / divider, 'width': 100 / divider, 'height': 30 / divider, 'image': gameA};

        const gameB = new Image();
        gameB.src = './спрайты/интерфейс/игра б.png';
        this.#gameBLabel = { 'x': 390 / divider, 'y': 580 / divider, 'width': 100 / divider, 'height': 30 / divider, 'image': gameB};

        this.#currentGameLabel = this.#gameALabel;

        const twoPoints = new Image();
        twoPoints.src = './спрайты/интерфейс/двоеточие.png';
        this.#twoPoints = { 'x': 760 / divider, 'y': 210 / divider, 'width': 20 / divider, 'height': 50 / divider, 'image': twoPoints };

        this.#alarmAudio = new Audio('./звуки/будильник.mp4');

        const topLightning = new Image();
        topLightning.src = './спрайты/интерфейс/верхняя молния.png';
        const bottomLightning = new Image();
        bottomLightning.src = './спрайты/интерфейс/нижняя молния.png';
        const note = new Image();
        note.src = './спрайты/интерфейс/нота.png';
        const miniOctopusLabel = new Image();
        miniOctopusLabel.src = './спрайты/интерфейс/маленький осьминог.png';
        this.#alarmLabels = {
            top: {'x': 905 / divider, 'y': 195 / divider, 'width': 50 / divider, 'height': 25 / divider, 'image': topLightning},
            bottom: {'x': 910 / divider, 'y': 270 / divider, 'width': 45 / divider, 'height': 20 / divider, 'image': bottomLightning},
            note: {'x': 912 / divider, 'y': 230 / divider, 'width': 35 / divider, 'height': 25 / divider, 'image': note},
            miniOctopusLabel: {'x': 960 / divider, 'y': 210 / divider, 'width': 95 / divider, 'height': 90 / divider, 'image': miniOctopusLabel}
        };
    }

    /**
     * Преобразование чисел в изображение
     * @param {Object.<string, any>} obj - время или звонок
     * @return {Object.<number, Object.<string, any>>}
     */
    #getDigitsFromObj(obj) {
        let str = String(obj.hours)+String(obj.minutes).padStart(2, '0');
        this.#translateDigits(str);
        return this.#digits;
    }

    /** Получение преобразованного времени часов
     * @return {Object.<number, Object.<string, any>>}
     */
    get time() {
        return this.#getDigitsFromObj(this.#clock);
    }

    /** Получение преобразованного времени будильника
     * @return {Object.<number, Object.<string, any>>}
     */
    get alarmTime() {
        return this.#getDigitsFromObj(this.#alarm);
    }

    /** Обнуление часов
     * @return {void}
     */
    setStartClock() {
        this.#clock.hours = 12;
        this.#clock.minutes = 0;
        this.#clock.isPm = false;
    }

    /** Обнуление будильника
     * @return {void}
     */
    setStartAlarm() {
        this.#alarm.hours = 12;
        this.#alarm.minutes = 0;
        this.#alarm.isPm = true;
    }

    /**
     * Добавление минут
     * @param {Object.<string, any>} obj - часы или будильник
     * @return {void}
     */
    #addMinute(obj) {
        if (obj.minutes == 59) {
            this.#addHour(obj);
            obj.minutes = -1;
        }
        obj.minutes += 1
    }

    /** Добавление минут часам
     * @return {void}
     */
    addMinute() {
        this.#addMinute(this.#clock);
    }

    /** Добавление минут будильнику
     * @return {void}
     */
    addAlarmMinute() {
       this.#addMinute(this.#alarm);
    }

    /**
     * Добавление часов 
     * @param {Object.<string, any>} obj - часы или будильник
     * @return {void}
     */
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

    /**
     * Добавление часов времени
     * @return {void}
     */
    addHour() {
        this.#addHour(this.#clock);
    }

    /** Добавление часов будильнику
     * @return {void}
     */
    addAlarmHour() {
        this.#addHour(this.#alarm);
    }

    /**
     * Возвращает признак совпадения времени на часах и времени будильнка
     * @return {boolean}
     */
    checkAlarm() {
        return this.#clock.hours == this.#alarm.hours && 
        this.#clock.minutes == this.#alarm.minutes
         && this.#clock.isPm == this.#alarm.isPm;
    }

    /**
     * Проигрывание времени будильника
     * @return {void}
     */
    alarmSoundPlay() {
        this.#alarmAudio.play();
    }

    /**
     * ПП или ДП для часов
     * @return {Object.<string, any>}
     */
    get timeIndicator() {
        if (this.#clock.isPm) {
            return this.#pm;
        }
        return this.#am;
    }

    /**
     * ПП или ДП для будильника
     * @return {Object.<string, any>}
     */
    get alarmIndicator() {
        if (this.#alarm.isPm) {
            return this.#pm;
        }
        return this.#am;
    }

    /** Изображение текущих цифр на табло
     * @return {Object.<number, Object.<string, any>>}
     */
    get digits() {
        return this.#digits;
    }

    /** Фон 
     * @return {Image}
     */
    get background() {
        return this.#background;
    }

    /** Фон во время сброса
     * @return {Image}
     */
    get firstBackground() {
        return this.#firstBackground;
    }

    /**
     * Преобразование числа в изображения цифр
     * @param {string} str - стока, состоящая из цифр
     * @return {void}
     */
    #translateDigits(str) {
        for (let i = 0; i < str.length; i++) {
            this.#digits[str.length-1-i]['image'] = this.#allDigits[str[i]];
        }
        for (let i = str.length; i < Object.keys(this.#digits).length; i++) {
            this.#digits[i]['image'] = this.#noneDigit;
        }
    }

    /** Добавление очка
     * @return {void}
     */
    addScore() {
        if (this.#score < 999) {
            this.#score++;
            this.#translateDigits(String(this.#score));
        }
    }

    /**
     * @param {number} score - очки
     */
    set score(score) {
        if (score >= 0 && score <= 999) {
            this.#score = score;
            this.#translateDigits(String(this.#score));
        } else {
            this.#score = 0;
        }
    }

    /**
     * @return {number}
     */
    get score() {
        return this.#score;
    }

    /** Левая нажатая кнопка
     * @return {Object.<string, any>}
     */
    get pressedButtonLeft() {
        return this.#buttons.left;
    }
    
    /** Правая нажатая кнопка
     * @return {Object.<string, any>}
     */
    get pressedButtonRight() {
        return this.#buttons.right;
    }

    /** Нажатая кнопка игры а
     * @return {Object.<string, any>}
     */
    get pressedGameAButton() {
        return this.#buttons.gameA;
    }

    /** Нажатая кнопка игры б
     * @return {Object.<string, any>}
     */
    get pressedGameBButton() {
        return this.#buttons.gameB;
    }

    /** Нажатая кнопка времени
     * @return {Object.<string, any>}
     */
    get pressedTimeButton() {
        return this.#buttons.time;
    }

    /** Нажатая кнопка будильника
     * @return {Object.<string, any>}
     */
    get pressedAlarmButton() {
        return this.#buttons.alarm;
    }

    /** Нажатая кнопка сброса
     * @return {Object.<string, any>}
     */
    get pressedResetButton() {
        return this.#buttons.reset;
    }

    /** Текущая надпись игры
     * @return {Object.<string, any>}
     */
    get gameLabel() {
        return this.#currentGameLabel;
    }

    /** двоеточие
     * @return {Object.<string, any>}
     */
    get twoPoints() {
        return this.#twoPoints;
    }

    /** Установка надписи игры а
     * @return {void}
     */
    setGameA() {
        this.#currentGameLabel = this.#gameALabel;
    }

    /** Установка надписи игры б
     * @return {void}
     */
    setGameB() {
        this.#currentGameLabel = this.#gameBLabel;
    }

    /** Две молнии и нота
     * @return {Array<Object.<string, any>>}
     */
    get alarmSignalLabels() {
        return [this.#alarmLabels.top, this.#alarmLabels.bottom, this.#alarmLabels.note];
    }

    /** Маленький осьминог
     * @return {Object.<string, any>}
     */
    get miniOctopusLabel() {
        return this.#alarmLabels.miniOctopusLabel;
    }

    /** Нота
     * @return {Object.<string, any>}
     */
    get noteLabel() {
        return this.#alarmLabels.note;
    }
}