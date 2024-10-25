class Octopus {
    /**
     * @type {Array<Tentacle>} - массив с объектами класса Tentacle
     */
    #tentacles;
    /**
     * @type {number} - индекс текущего щупальца 
     */
    #currentTentacle;
    /**
     * Первые два щупальца имеют отдельные переменные, потому что анимируются всего 4 щупальца
     *  с переодической сменой 1 и 2 щупальцев, далее в отельный момент, когда нулевой элемент массива (1 или 2 щупальце)
     * полностью спрятан, то происходит замена в данном элементе 1 щупальца на 2, или 2 на 1, или 1 на 1, или 2 на 2.  
     * 
     */
    /**
     * @type {Tentacle} - первое щупальце
     */
    #tentacle1;
    /**
     * @type {Tentacle} - второе щупальце
     */
    #tentacle2;
    #moveB;
    #tentacleOneFixedState // переназвать!!!! отвечает за игру б и нужна для того чтобы не срабатывало два раза при одном щупальце

    constructor() {
        this.#currentTentacle = 0;
        this.#moveB = false;
        this.#tentacle1 = new Tentacle(1);
        this.#tentacle2 = new Tentacle(2);
        this.#tentacles = [this.#tentacle1, new Tentacle(4), new Tentacle(3), new Tentacle(5)];
        this.#tentacles[Math.floor(Math.random() * 4)].minLeftState = 1;
    }

    /**
     * Данный метод меняет состояние у текущего щупальца и переходит к следующему
     * @return {void}
     */
    move() {
        if (this.#tentacles[0].currentState == 0) {
            this.#tentacles[0] = Math.floor(Math.random() * 2) == 0 ? this.#tentacle1 : this.#tentacle2;
        }
        this.#tentacles[this.#currentTentacle % this.#tentacles.length].updateCurrentState();
        /*if (this.#moveB) {
            if (this.#tentacles[this.#currentTentacle % this.#tentacles.length].minLeftState == 1 && 
                this.#tentacles[this.#currentTentacle % this.#tentacles.length].currentState == 1) {
                this.#tentacles[this.#currentTentacle % this.#tentacles.length].minLeftState = 0;
                let randomV = Math.floor(Math.random() * 4);
                console.log(randomV);
                this.#tentacles[randomV].minLeftState = 1;
            }
        }*/
        this.#currentTentacle++;
    }

    /** Возвращает массив с текущими изображениями щупальцев (см класс Tentacle)
     * @return {Array<Tentacle>} 
     */
    get tentacles() {
        return [this.#tentacle1.currentStatePicture, this.#tentacle2.currentStatePicture, 
            this.#tentacles[1].currentStatePicture, this.#tentacles[2].currentStatePicture,
            this.#tentacles[3].currentStatePicture];
    }

    /**
     * Данный метод проверяет столкновение дайвера и осьминога
     * @param {number} ind - текущая позиция дайвера
     * @return {boolean} 
     */
    checkCollision(ind) {
        for (let tentacle of this.#tentacles) {
            if (tentacle.getIsLastCurrentState() && tentacle.collisionValues.indexOf(ind) != -1) {
                return true;
            }
        }
        return false;
    }

    /**
     * Данный метод устанавливает 3 и 4 щупальце в положение, когда дайвер был пойман
     * @return {void}
     */
    setCollisionPos() {
        this.#tentacles[2].currentState = 2;
        if (this.#tentacles[1].currentState < 2) {
            this.#tentacles[1].currentState = 2;
        }
    }

    set moveB(flag) {
        this.#moveB = flag;
    }
}