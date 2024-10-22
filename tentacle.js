class Tentacle {
    /**
     * @typedef {Object.<number, Object.<string, any>>} - словарь с номерами позиций,
     *  изображениями, координатами и размерами
     */
    #states;
    /**
     * @typedef {Number} - текущее состояние щупальца (от спрятонного до полностью раскрывшегося)
     */
    #currendState;
    #nextStateInc;
    #collisionValues;

    constructor(ind) {
        this.#currendState = 0;
        this.#nextStateInc = 1;

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

    #initStates(sourceIndex, ind, x, y, width, height) {
        for (let i = 0; i < sourceIndex; i++) {
            const img = new Image();
            img.src = `./спрайты/щупальца/щ${ind}${i}.png`;
            this.#states[i] = {'image': img, 'x': x,'y': y, 'width': width, 'height': height};
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
    
    get currentState() {
        return this.#states[this.#currendState];
    }

    getIs0CurrentState() {
        return this.#currendState == 0;
    }

    getIsLastCurrentState() {
        return this.#currendState == Object.keys(this.#states).length - 1;
    }

    getCollisionValues() {
        return this.#collisionValues;
    }
}