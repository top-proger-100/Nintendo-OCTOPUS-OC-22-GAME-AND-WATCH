class Tentacle {
    /**
     * @type {Object.<number, Object.<string, any>>} - объект с номерами позиций,
     *  изображениями, координатами и размерами
     */
    #states;
    /**
     * @type {Number} - текущее состояние щупальца (от спрятанного до полностью раскрывшегося)
     */
    #currentState;
    /**
     * @type {Number} - направление (+1 или -1) щупальца (на раскрытие или на укрытие)
     */
    #nextStateInc;
    /**
     * @type {Array<number>} - массив позиций дайвера, который соответствует конкретному щупальцу 
     */
    #collisionValues;
    #minLeftState;
    #moveUpCicle;

    constructor(ind) {
        this.#currentState = 0;
        this.#nextStateInc = 1;
        this.#minLeftState = 0;
        this.#moveUpCicle = true;

        this.#states = {};
        switch (ind) {
            case 1:
                this.#initStates(4, ind, 490, 330, 165, 40);
                this.#collisionValues = [3];
                break;
            case 2:
                this.#initStates(5, ind, 515, 345, 145, 130);
                this.#collisionValues = [4];
                break;
            case 3:
                this.#initStates(6, ind, 630, 380, 80, 155);
                this.#collisionValues = [5];
                break;
            case 4:
                this.#initStates(5, ind, 735, 420, 40, 120);
                this.#collisionValues = [6];
                break;
            case 5:
                this.#initStates(4, ind, 880, 460, 50, 90);
                this.#collisionValues = [7, 8, 9, 10];
                break;
        }
    }

    /**
     * Данный метод задаёт состояния и атрибуты щупальца
     * @param {number} sourceIndex - количество возможных состояния щупальца
     * @param {number} ind - номер щупальца (нужен для пути фотографии) 
     * @param {number} x - положение по горизонтали
     * @param {number} y - положение по вертикали
     * @param {number} width - ширина
     * @param {number} height - высота
     * @return {void}
     */
    #initStates(sourceIndex, ind, x, y, width, height) {
        for (let i = 0; i < sourceIndex; i++) {
            const img = new Image();
            img.src = `./спрайты/щупальца/щ${ind}${i}.png`;
            this.#states[i] = {'image': img, 'x': x,'y': y, 'width': width, 'height': height};
        }
    }

    /** Данный метод меняет состояние щупальца
     * @return {void}
     */
    updateCurrentState() {
        if (this.#currentState == Object.keys(this.#states).length - 1) {
            this.#nextStateInc = -1;
            this.#moveUpCicle = false;
        } else if (this.#currentState == this.#minLeftState) {
            this.#nextStateInc = 1;
        }
        this.#currentState += this.#nextStateInc;
        if (this.#currentState == this.#minLeftState && !this.#moveUpCicle) {
            this.#moveUpCicle = true;
        }
    }

    get moveUpCicle() {
        return this.#moveUpCicle;
    }
    
    /**
     * @return {Object.<string, any>} - атрибуты щупальца
     */
    get currentStatePicture() {
        return this.#states[this.#currentState];
    }

    /** Текущее состояние щупальца
     * @return {number} 
     */
    get currentState() {
        return this.#currentState;
    }

    /** 
     * @param {number} state - состояние щупальца
     */
    set currentState(state) {
        if (state >= 0 && state < Object.keys(this.#states).length) {
            this.#currentState = state;
        }
    } 

    /** Раскрылось ли щупальце до конца
     * @return {boolean} 
     */
    getIsLastCurrentState() {
        return this.#currentState == Object.keys(this.#states).length - 1;
    }

    /** Возвращает массив состояний дайвера, который соответсвует данному щупальцу
     * @return {Array<number>}
     */
    get collisionValues() {
        return this.#collisionValues;
    }

    set minLeftState(state) {
        if (state >= 0 && state <= Object.keys(this.#states).length - 1) {
            this.#minLeftState = state;
        }
    }

    get minLeftState() {
        return this.#minLeftState;
    }
}