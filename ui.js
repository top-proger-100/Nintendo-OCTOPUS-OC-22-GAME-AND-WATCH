class UI {
    #digits;
    #score = 0;
    #pressedButtonLeft;
    #pressedButtonRight;
    #background;
    #firstBackground;
    #allDigits;
    #noneDigit;
    #gameALabel;
    #gameBLabel;
    #currentGameLabel;
    #pressedGameAButton;
    #pressedGameBButton;
    #pressedTimeButton;

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
        this.#pressedButtonLeft = { 'x': 100, 'y': 557, 'width': 100, 'height': 100, 'image': pressedButton };
        this.#pressedButtonRight = { 'x': 1240, 'y': 557, 'width': 100, 'height': 100, 'image': pressedButton };

        const background = new Image();
        background.src = './спрайты/фон.png';
        this.#background = background;

        const firstBackground = new Image();
        firstBackground.src = './спрайты/первоначальный фон.jpg';
        this.#firstBackground = firstBackground;

        const gameA = new Image();
        gameA.src = './спрайты/интерфейс/игра а.png';
        this.#gameALabel = { 'x': 390, 'y': 545, 'width': 100, 'height': 30, 'image': gameA};

        const gameB = new Image();
        gameB.src = './спрайты/интерфейс/игра б.png';
        this.#gameBLabel = { 'x': 390, 'y': 580, 'width': 100, 'height': 30, 'image': gameB};

        this.#currentGameLabel = this.#gameALabel;

        const pressedChooseButton = new Image();
        pressedChooseButton.src = './спрайты/интерфейс/нажатая кнопка выбора.png';
        this.#pressedGameAButton = {'x': 1212, 'y': 82, 'width': 70, 'height': 35, 'image': pressedChooseButton};
        this.#pressedGameBButton = {'x': 1212, 'y': 180, 'width': 70, 'height': 35, 'image': pressedChooseButton};
        this.#pressedTimeButton = {'x': 1212, 'y': 278, 'width': 70, 'height': 35, 'image': pressedChooseButton};
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

    #translateScore() {
        let strScore = String(this.#score);
        for (let i = 0; i < strScore.length; i++) {
            this.#digits[strScore.length-1-i]['image'] = this.#allDigits[strScore[i]];
        }
    }

    addScore() {
        if (this.#score < 999) {
            this.#score++;
            this.#translateScore();
        }
    }

    set score(score) {
        if (score >= 0 && score <= 999) {
            this.#score = score;
            this.#translateScore();
        }
    }

    get score() {
        return this.#score;
    }

    get pressedButtonLeft() {
        return this.#pressedButtonLeft;
    }
    
    get pressedButtonRight() {
        return this.#pressedButtonRight;
    }

    get pressedGameAButton() {
        return this.#pressedGameAButton;
    }

    get pressedGameBButton() {
        return this.#pressedGameBButton;
    }

    get pressedTimeButton() {
        return this.#pressedTimeButton;
    }

    get gameLabel() {
        return this.#currentGameLabel;
    }

    setGameA() {
        this.#currentGameLabel = this.#gameALabel;
    }

    setGameB() {
        this.#currentGameLabel = this.#gameBLabel;
    }
}