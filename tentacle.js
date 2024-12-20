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
    /**
     * @type {number} - левая граница, до которой доходит прячущееся щупальце
     */
    #minLeftState;
    /**
     * @type {boolean} - щупальце раскрывается или прячется (нужно для игры Б)
     */
    #moveUpCicle;
    /**
     * 
     * @param {number} ind - номер щупальца
     */
    constructor(ind, scale=1) {
        this.#currentState = 0;
        this.#nextStateInc = 1;
        this.#minLeftState = 0;
        this.#moveUpCicle = true;

        this.#states = {};
        switch (ind) {
            case 1:
                this.#initStates(4, ind, 490 * scale, 330 * scale, 165 * scale, 40 * scale);
                this.#collisionValues = [3];
                break;
            case 2:
                this.#initStates(5, ind, 515 * scale, 345 * scale, 145 * scale, 130 * scale);
                this.#collisionValues = [4];
                break;
            case 3:
                this.#initStates(6, ind, 630 * scale, 380 * scale, 80 * scale, 155 * scale);
                this.#collisionValues = [5];
                break;
            case 4:
                this.#initStates(5, ind, 735 * scale, 420 * scale, 40 * scale, 120 * scale);
                this.#collisionValues = [6];
                break;
            case 5:
                this.#initStates(4, ind, 880 * scale, 460 * scale, 50 * scale, 90 * scale);
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

    /** Данный метод меняет направление движения
     * @return {void}
     */
    changeNextStateInc() {
        this.#nextStateInc *= -1;
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
 
    /** Щупальце раскрывается или прячется (нужно для игры Б)
     * @return {boolean}
     */
    get moveUpCicle() {
        return this.#moveUpCicle;
    }
    
    /** Атрибуты щупальца
     * @return {Object.<string, any>}
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

    /**
     * @param {number} state - минимальное левое состояние щупальца
     */
    set minLeftState(state) {
        if (state >= 0 && state <= Object.keys(this.#states).length - 1) {
            this.#minLeftState = state;
        }
    }

    /** Возвращает минимальное левое состояние щупальца
     * @return {number} 
     */
    get minLeftState() {
        return this.#minLeftState;
    }
}