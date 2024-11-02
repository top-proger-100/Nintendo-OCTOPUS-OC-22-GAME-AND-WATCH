class Diver {
    /**
     * @type {Object.<number, Object.<string, any>>} - объект, хранящий в себе позиции дайвера кроме позиций при поимке
     */
    #diversStates;
    /**
     * @type {Object.<number, Object.<string, any>>} - объект, хранящий в себе позиции дайвера без мешка
     */
    #diversStatesWithoutBag;
    /**
     * @type {Object.<number, Object.<string, any>>} - объект, хранящий в себе позиции дайвера с мешком
     */
    #diversStatesWithBag;
    /**
     * @type {Object.<number, Object.<string, any>>} - объект, хранящий в себе позиции дайвера при поимке
     */
    #diversCatchedStates;
    /**
     * @type {number} - номер текущей позиции
     */
    #curInd;
    /**
     * @type {boolean} - признак того, что дайвер жив
     */
    #isAlive;
    /**
     * @type {boolean} - признак того, что дайвер первый в лодке
     */
    #isFirst;
    /**
     * @type {number} - позиция первого дайвера
     */
    #firstBoatPos;
    /**
     * @type {number} - крайняя позиция, после которой будет отыгрываться анимация получения сокровища
     */
    #lastPos;
    /**
     * @type {number} - левая граница, проход за которую запрещён
     */
    #leftBorder;
    /**
     * @type {boolean} - признак наличия мешка у дайвера
     */
    #isWithBag;
    /**
     * @type {boolean} - текущее состояние дайвера при поимке
     */
    #catchedPos;
    /**
     * @type {Audio} - звук получения сокровища
     */
    #moneySound;
    /**
     * @type {Audio} - звук касания щупальца до дайвера
     */
    #collisionedSound;
    /**
     * @type {Audio} - звук поимки дайвера
     */
    #catchedSound;

    constructor() {
        this.#curInd = 0;
        this.#isAlive = true;
        this.#isFirst = false;
        this.#firstBoatPos = 2;
        this.#lastPos = 7;
        this.#leftBorder = 0;
        this.#isWithBag = false;

	let divider = 1.5;

        this.#diversStatesWithoutBag = {
            0: { 'x': 555 / divider, 'y': 210 / divider, 'width': 45 / divider, 'height': 60 / divider, 'image': null },
            1: { 'x': 500 / divider, 'y': 210 / divider, 'width': 45 / divider, 'height': 60 / divider, 'image': null },
            2: { 'x': 417 / divider, 'y': 210 / divider, 'width': 55 / divider, 'height': 60 / divider, 'image': null },
            3: { 'x': 425 / divider, 'y': 320 / divider, 'width': 85 / divider, 'height': 85 / divider, 'image': null },
            4: { 'x': 455 / divider, 'y': 440 / divider, 'width': 75 / divider, 'height': 90 / divider, 'image': null },
            5: { 'x': 550 / divider, 'y': 505 / divider, 'width': 80 / divider, 'height': 85 / divider, 'image': null },
            6: { 'x': 680 / divider, 'y': 505 / divider, 'width': 75 / divider, 'height': 85 / divider, 'image': null },
            7: { 'x': 825 / divider, 'y': 510 / divider, 'width': 75 / divider, 'height': 85 / divider, 'image': null },
        }
        let imgWbLen = 8;
        for (let i = 1; i <= imgWbLen; i++) {
            const img = new Image();
            img.src = `./спрайты/водолазы/${i}бм.png`;
            this.#diversStatesWithoutBag[i-1]['image'] = img;
        }

        const image8 = new Image();
        image8.src = './спрайты/водолазы/8.png';
        const image10 = new Image();
        image10.src = './спрайты/водолазы/10.png';

        this.#diversStatesWithBag = {
            0: { 'x': 550 / divider, 'y': 210 / divider, 'width': 45 / divider, 'height': 60 / divider, 'image': null },
            1: { 'x': 500 / divider, 'y': 210 / divider, 'width': 45 / divider, 'height': 60 / divider, 'image': null },
            2: { 'x': 417 / divider, 'y': 210 / divider, 'width': 83 / divider, 'height': 60 / divider, 'image': null },
            3: { 'x': 425 / divider, 'y': 320 / divider, 'width': 105 / divider, 'height': 85 / divider, 'image': null },
            4: { 'x': 450 / divider, 'y': 440 / divider, 'width': 80 / divider, 'height': 100 / divider, 'image': null },
            5: { 'x': 555 / divider, 'y': 505 / divider, 'width': 85 / divider, 'height': 90 / divider, 'image': null },
            6: { 'x': 675 / divider, 'y': 505 / divider, 'width': 85 / divider, 'height': 90 / divider, 'image': null },
            7: { 'x': 795 / divider, 'y': 510 / divider, 'width': 105 / divider, 'height': 85 / divider, 'image': null },
            8: { 'x': 794 / divider, 'y': 509 / divider, 'width': 160 / divider, 'height': 83.5 / divider, 'image': null },
            9: { 'x': 795 / divider, 'y': 510 / divider, 'width': 105 / divider, 'height': 85 / divider, 'image': image8 },
            10: { 'x': 794 / divider, 'y': 510 / divider, 'width': 107 / divider, 'height': 86 / divider, 'image': image10 },
        }
        let imgBLen = 9;
        for (let i = 1; i <= imgBLen; i++) {
            const img = new Image();
            img.src = `./спрайты/водолазы/${i}.png`;
            this.#diversStatesWithBag[i-1]['image'] = img;
        }
        
        this.#diversStates = this.#diversStatesWithoutBag;

        this.#catchedPos = 0;
        const catchImage0 = new Image();
        catchImage0.src = './спрайты/водолазы/п0.png';
        const catchImage1 = new Image();
        catchImage1.src = './спрайты/водолазы/п1.png';
        this.#diversCatchedStates = {
            0: { 'x': 678 / divider, 'y': 378 / divider, 'width': 140 / divider, 'height': 110 / divider, 'image': catchImage0 },
            1: { 'x': 678 / divider, 'y': 378 / divider, 'width': 140 / divider, 'height': 110 / divider, 'image': catchImage1 }
        }

        this.#moneySound = new Audio('./звуки/сокровище.mp4');
        this.#collisionedSound = new Audio('./звуки/коснулись.mp4');
        this.#catchedSound = new Audio('./звуки/поймали.mp4');
    }

    /** Установка параметров, которые делают дайвера первым в лодке
     * @return {void}
     */
    setFirst() {
        this.#isFirst = true;
        this.#curInd = this.#firstBoatPos;
        this.#leftBorder = this.#firstBoatPos+1;
        this.#catchedPos = 0;
        this.#isAlive = true;
    }

    /**
     * Установка признака "смерти" дайвера
     * @return {void}
     */
    setDeath() {
        this.#isAlive = false;
        this.#isFirst = false;
    }

    /**
     * Проверка нахождения дайвера на позиции, с которой он может взять сокровище
     * @return {boolean}
     */
    isGetMoneyPos() {
        return this.#curInd == this.#lastPos;
    }

    /**
     * Проверка нахождения дайвера на стартовой позиции
     * @return {boolean}
     */
    getIsOnBoat() {
        return this.#curInd == this.#firstBoatPos;
    }

    /**
     * Проверка нахождения в лодке с мешком
     * @return {boolean}
     */
    getIsOnBoatWithBag() {
        return this.#curInd == this.#firstBoatPos && this.#isWithBag;
    }

    /**
     * Проверка получения мешка
     * @return {boolean}
     */
    getIsWithBag() {
        return this.#isWithBag;
    }

    /** Когда игрок вернулся обратно на лодку вызвается этот метод, который подразумевает, что
     * происходит анимация окускания и поднятия мешка
     * @return {void}
     */
    bagAnimationMovement() {
        if (this.#isWithBag) {
            this.#isWithBag = false;
            this.#diversStates = this.#diversStatesWithoutBag;
        } else {
            this.#isWithBag = true;
            this.#diversStates = this.#diversStatesWithBag;
        }
    }

    /** Возвращает признак (живой\мёртвый)
     * @return {boolean} 
     */
    get alive() {
        return this.#isAlive;
    }

    /**
     * @param {boolean} flag - живой\мёртвый
     */
    set alive(flag) {
        this.#diversStates = this.#diversStatesWithoutBag;
        this.#isAlive = flag;
        this.#isWithBag = false;
    }

    /**
     * Возвращает атрибуты дайвера (x, y, ширина, высота и картинка)
     * @return {Object.<string, any>}
     */
    getAttrs() {
        return this.#diversStates[this.#curInd];
    }

    /** Движение влево с проверкой крайних позиций
     * @return {void}
     */
    moveLeft() {
        if (this.#curInd == this.#firstBoatPos) {
            this.#diversStates = this.#diversStatesWithoutBag;
            this.#leftBorder = this.#firstBoatPos + 1;
        }
        if (this.#isAlive && this.#curInd > this.#leftBorder && this.#curInd <= this.#lastPos) {
            this.#curInd--;
        }
    }

     /** Движение вправо с проверкой крайних позиций
     * @return {void}
     */
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

    /** Изменение состояний дайвера при получении сокровища 
     * @return {void}
     */
    getMoney() {
        if (this.#isAlive) {
            if (this.#curInd >= this.#lastPos && this.#curInd < Object.keys(this.#diversStates).length-1) {
                this.#curInd++;
            } else if (this.#curInd >= Object.keys(this.#diversStates).length-1) {
                this.#curInd = this.#lastPos;
            }
        }
    }

    /**
     * Возвращает атрибуты пойманного дайвера
     * @return {@return {Object.<string, any>}}
     */
    getCatchedAttrs() {
        return this.#diversCatchedStates[this.#catchedPos % Object.keys(this.#diversCatchedStates).length];
    }

    /** Изменение следующей позиции пойманного дайвера
     * @return {void}
     */
    setNextCatchedDiver() {
        this.#catchedPos++; 
    }

    /** Текущая позиция
     * @return {number}
     */
    get currentInd() {
        return this.#curInd;
    }

    /** 
     * @param {number} ind
     */
    set currentInd(ind) {
        if (ind >= 0 && ind < Object.keys(this.#diversStates).length) {
            this.#curInd = ind;
        }
    }

    /**
     * Проигрывание звука получения сокровища
     * @return {void}
     */
    moneySound() {
        this.#moneySound.play();
    }

    /**
     * Проигрывание звука касания с щупальцем
     * @return {void}
     */
    collisionSound() {
        this.#collisionedSound.play();
    }

    /**
     * Проигрывание звука "убийства" дайвера
     * @return {void}
     */
    catchedSound() {
        this.#catchedSound.play();
    }
}