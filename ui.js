class UI {
    #digits;
    #score = 0;
    #pressedButton;
    #background;
    #allDigits;
    #noneDigit;

    constructor() {
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
        this.#pressedButton = pressedButton;

        const background = new Image();
        background.src = './спрайты/фон.png';
        this.#background = background;
    }

    get digits() {
        return this.#digits;
    }

    get background() {
        return this.#background;
    }

    addScore() {
        this.#score++;
        let strScore = String(this.#score);
        for (let i = 0; i < strScore.length; i++) {
            this.#digits[strScore.length-1-i]['image'] = this.#allDigits[strScore[i]];
        }
    }

    get pressedButton() {
        return this.#pressedButton;
    }
    
}