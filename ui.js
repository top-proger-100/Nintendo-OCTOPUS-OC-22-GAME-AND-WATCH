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
    #twoPoints;
    #isPm;
    #am;
    #pm;

    constructor() {
        this.#isPm = false;

        const am = new Image();
        am.src = './спрайты/интерфейс/дп.png';
        this.#am = {'x': 605, 'y': 205, 'width': 50, 'height': 25, 'image': am };
        const pm = new Image();
        pm.src = './спрайты/интерфейс/пп.png';
        this.#pm = {'x': 605, 'y': 240, 'width': 50, 'height': 25, 'image': pm };

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

        const twoPoints = new Image();
        twoPoints.src = './спрайты/интерфейс/двоеточие.png';
        this.#twoPoints = { 'x': 760, 'y': 210, 'width': 20, 'height': 50, 'image': twoPoints };
    }

    get time() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        if (hours > 12) {
            this.#isPm = true;
            hours = hours % 12;
        } else if (hours == 12) {
            this.#isPm = true;
        } else if (hours == 0) {
            hours = 12;
            this.#isPm = false;
        } else {
            this.#isPm = false;
        }
        let str = String(hours)+String(minutes).padStart(2, '0');
        this.#translateDigits(str);
        return this.#digits;
    }

    get timeIndicator() {
        if (this.#isPm) {
            return this.#pm;
        } 
        return this.#am;
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

    #translateDigits(value) {
        let str = String(value);
        for (let i = 0; i < str.length; i++) {
            this.#digits[str.length-1-i]['image'] = this.#allDigits[str[i]];
        }
    }

    addScore() {
        if (this.#score < 999) {
            this.#score++;
            this.#translateDigits(this.#score);
        }
    }

    set score(score) {
        if (score >= 0 && score <= 999) {
            this.#score = score;
            for (let i = 0; i < Object.keys(this.#digits).length; i++) {
                this.#digits[i]['image'] = this.#noneDigit;
            }
            this.#translateDigits(this.#score);
        } else {
            this.#score = 0;
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

    get twoPoints() {
        return this.#twoPoints;
    }

    setGameA() {
        this.#currentGameLabel = this.#gameALabel;
    }

    setGameB() {
        this.#currentGameLabel = this.#gameBLabel;
    }
}