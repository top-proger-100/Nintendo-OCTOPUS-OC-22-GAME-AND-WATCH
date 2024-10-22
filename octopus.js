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
     *  с переодической сменой 1 и 2 щупальцев, далее в отельный момент, когда нулевой элемент массива (щупальце)
     * полностью спрятан, то происходит замена в данном элементе 1 щупальце на 2, или 2 на 1, или 1 на 1, или 2 на 2.  
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


    constructor() {
        this.#currentTentacle = 0;
        this.#tentacle1 = new Tentacle(1);
        this.#tentacle2 = new Tentacle(2);
        this.#tentacles = [this.#tentacle1, new Tentacle(4), new Tentacle(3), new Tentacle(5)];
    }

    /**
     * Данный метод меняет состояние у текущего щупальца и переходит к следующему
     * @return {void}
     */
    move() {
        if (this.#tentacles[0].getIs0CurrentState()) {
            this.#tentacles[0] = Math.floor(Math.random() * 2) == 0 ? this.#tentacle1 : this.#tentacle2;
        }
        this.#tentacles[this.#currentTentacle % this.#tentacles.length].updateCurrentState();
        this.#currentTentacle++;
    }

    /**
     * @return {Array<Tentacle>} - массив с текущими изображениями щупальцев (см класс Tentacle)
     */
    get tentacles() {
        return [this.#tentacle1.currentState, this.#tentacle2.currentState, 
            this.#tentacles[1].currentState, this.#tentacles[2].currentState,
            this.#tentacles[3].currentState];
    }

    /**
     * Данный метод проверяет столкновение дайвера и осьминога
     * @param {number} ind - текущая позиция дайвера
     * @return {boolean} 
     */
    checkCollision(ind) {
        for (let tentacle of this.#tentacles) {
            if (tentacle.getIsLastCurrentState() && tentacle.getCollisionValues().indexOf(ind) != -1) {
                return true;
            }
        }
        return false;
    }
}