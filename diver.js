class Diver {
    #diversStates;
    #diversStatesWithoutBag;
    #diversStatesWithBag;
    #diversCatchedStates;
    #curInd = 0;
    #isAlive = true;
    #isFirst = false;
    #firstBoatPos = 2;
    #lastPos = 7;
    #leftBorder = 0;
    #isWithBag = false;
    #catchedPos;

    constructor() {
        this.#diversStatesWithoutBag = {
            0: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': null },
            1: { 'x': 500, 'y': 210, 'width': 50, 'height': 60, 'image': null },
            2: { 'x': 415, 'y': 210, 'width': 60, 'height': 60, 'image': null },
            3: { 'x': 425, 'y': 320, 'width': 85, 'height': 85, 'image': null },
            4: { 'x': 455, 'y': 440, 'width': 75, 'height': 90, 'image': null },
            5: { 'x': 550, 'y': 505, 'width': 80, 'height': 85, 'image': null },
            6: { 'x': 680, 'y': 505, 'width': 75, 'height': 85, 'image': null },
            7: { 'x': 825, 'y': 510, 'width': 75, 'height': 85, 'image': null },
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
            0: { 'x': 550, 'y': 210, 'width': 50, 'height': 60, 'image': null },
            1: { 'x': 500, 'y': 210, 'width': 50, 'height': 60, 'image': null },
            2: { 'x': 415, 'y': 210, 'width': 88, 'height': 60, 'image': null },
            3: { 'x': 425, 'y': 320, 'width': 105, 'height': 85, 'image': null },
            4: { 'x': 450, 'y': 440, 'width': 80, 'height': 100, 'image': null },
            5: { 'x': 555, 'y': 505, 'width': 85, 'height': 90, 'image': null },
            6: { 'x': 675, 'y': 505, 'width': 85, 'height': 90, 'image': null },
            7: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': null },
            8: { 'x': 794, 'y': 509, 'width': 160, 'height': 83.5, 'image': null },
            9: { 'x': 795, 'y': 510, 'width': 105, 'height': 85, 'image': image8 },
            10: { 'x': 794, 'y': 510, 'width': 107, 'height': 86, 'image': image10 },
        }

        let imgBLen = 9;
        for (let i = 1; i <= imgBLen; i++) {
            const img = new Image();
            img.src = `./спрайты/водолазы/${i}.png`;
            this.#diversStatesWithBag[i-1]['image'] = img;
        }
        
        this.#diversStates = this.#diversStatesWithoutBag;

        this.#catchedPos = 0;
        const catchImage1 = new Image();
        catchImage1.src = './спрайты/водолазы/п1.png';
        const catchImage2 = new Image();
        catchImage2.src = './спрайты/водолазы/п2.png';
        this.#diversCatchedStates = {
            0: { 'x': 680, 'y': 380, 'width': 140, 'height': 110, 'image': catchImage1 },
            1: { 'x': 680, 'y': 380, 'width': 140, 'height': 110, 'image': catchImage2 }
        }
    }

    setFirst() {
        this.#isFirst = true;
        this.#curInd = this.#firstBoatPos;
        this.#leftBorder = this.#firstBoatPos+1;
        this.#catchedPos = 0;
    }

    setDeath() {
        this.#isAlive = false;
        this.#isFirst = false;
    }

    isGetMoneyPos() {
        return this.#curInd == this.#lastPos;
    }

    getIsOnBoat() {
        return this.#curInd == this.#firstBoatPos;
    }

    getIsOnBoatWithBag() {
        return this.#curInd == this.#firstBoatPos && this.#isWithBag;
    }

    getIsWithBag() {
        return this.#isWithBag;
    }

    bagAnimationMovement() {
        if (this.#isWithBag) {
            this.#isWithBag = false;
            this.#diversStates = this.#diversStatesWithoutBag;
        } else {
            this.#isWithBag = true;
            this.#diversStates = this.#diversStatesWithBag;
        }
    }

    isAlive() {
        return this.#isAlive;
    }

    getAttrs() {
        return this.#diversStates[this.#curInd];
    }

    moveLeft() {
        if (this.#curInd == this.#firstBoatPos) {
            this.#diversStates = this.#diversStatesWithoutBag;
            this.#leftBorder = this.#firstBoatPos + 1;
        }
        if (this.#isAlive && this.#curInd > this.#leftBorder && this.#curInd <= this.#lastPos) {
            this.#curInd--;
        }
    }

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

    getMoney() {
        if (this.#curInd >= this.#lastPos && this.#curInd < Object.keys(this.#diversStates).length-1) {
            this.#curInd++;
        } else if (this.#curInd >= Object.keys(this.#diversStates).length-1) {
            this.#curInd = this.#lastPos;
        }
    }

    getCatchedAttrs() {
        return this.#diversCatchedStates[this.#catchedPos % Object.keys(this.#diversCatchedStates).length];
    }

    setNextCatchedDiver() {
        this.#catchedPos++; 
    }

    get currentInd() {
        return this.#curInd;
    }

    // переделать на setBoatStartPos
    set currentInd(ind) {
        if (ind >= 0 && ind < Object.keys(this.#diversStates).length) {
            this.#curInd = ind;
        }
    }
}