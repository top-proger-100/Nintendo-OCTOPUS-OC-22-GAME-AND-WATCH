
// подумать насчёт данной анимации
function getMoneyAnimation(ui, currentDiver, obj, ctx) {
    if (currentDiver.isGetMoneyPos() && !obj.animationGetMoneyPlay) {
        obj.animationGetMoneyPlay = true;
        var getMoney = setInterval(function() {
            currentDiver.getMoney();
            let diverAttrs = currentDiver.getAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
            if (currentDiver.getIsWithBag()) 
            obj.innerCounter++;
            if (obj.innerCounter >= 4) {
                obj.innerCounter = 0;
                obj.animationGetMoneyPlay = false;
                ui.addScore();
                clearInterval(getMoney);
            }
        }, 100);
    }
}

function main() {
    var isLeftButtonPressed = false;
    var isRightButtonPressed = false;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    var ui = new UI();
    var background = ui.background;
    var pressedButton = ui.pressedButton;

    var octopus = new Octopus();

    var currentDiver = new Diver();
    currentDiver.setFirst();
    var secondDiver = new Diver();
    secondDiver.currentInd = 1;
    var thirdDiver = new Diver();
    var divers = [currentDiver, secondDiver, thirdDiver];

    var innerCounter = 0;
    var animationGetMoneyPlay = false;

    const obj = { innerCounter: innerCounter, animationGetMoneyPlay: animationGetMoneyPlay };

    window.addEventListener('keyup', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            if (!obj.animationGetMoneyPlay) {
                currentDiver.moveLeft();
            }
            isLeftButtonPressed = false;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            currentDiver.moveRight();
            isRightButtonPressed = false;
        }

    });

    window.addEventListener('keydown', function(event) {
        if (event.code == 'ArrowLeft' || event.code == 'KeyA') {
            isLeftButtonPressed = true;
        } else if (event.code == 'ArrowRight' || event.code == 'KeyD') {
            isRightButtonPressed = true;
            getMoneyAnimation(ui, currentDiver, obj, ctx);
        }
    });

    window.addEventListener('mousedown', function(event) {
        if (event.which == 1) {
            var rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top; 
            if (clickX >= 100 && clickX <= 200 && clickY >= 557 && clickY <= 657) {
                if (!obj.animationGetMoneyPlay) isLeftButtonPressed = true;
            } else if (clickX >= 1240 && clickX <= 1340 && clickY >= 557 && clickY <= 657) {
                isRightButtonPressed = true;
                getMoneyAnimation(ui, currentDiver, obj, ctx);
            }
        }
    });
    window.addEventListener('mouseup', function(event) {
        if (event.which == 1) {
            var rect = canvas.getBoundingClientRect();
            const clickX = event.clientX - rect.left;
            const clickY = event.clientY - rect.top; 
            if (clickX >= 100 && clickX <= 200 && clickY >= 557 && clickY <= 657) {
                isLeftButtonPressed = false;
                if (!obj.animationGetMoneyPlay) currentDiver.moveLeft();
            } else if (clickX >= 1240 && clickX <= 1340 && clickY >= 557 && clickY <= 657) {
                isRightButtonPressed = false;
                currentDiver.moveRight();
            }
        }
    });
    
    var onBoatCount = 0;
    var bagEmptyCount = 0;
    var isBagEmptyAnim = false;
    var octopusMoveSteps = 0;
    var isCatchedByOctopus = false; // нужно запретить двигаться 
    var catchedByOctopusSteps = 0;
    var isCollision = false;
    var collisionSteps = 0;

    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        for (let i = 0; i < divers.length; i++) {
            if (divers[i].isAlive()) {
                let diverAttrs = divers[i].getAttrs();
                ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
            }
        }
        if (isLeftButtonPressed) {
            ctx.drawImage(pressedButton, 100, 557, 100, 100);
        } else if (isRightButtonPressed) {
            ctx.drawImage(pressedButton, 1240, 557, 100, 100);
        }
        
        if (octopusMoveSteps == 10) {
            octopus.move();
            octopusMoveSteps = 0;
        }


        var tentacles = octopus.tentacles;
        for (let tentacle of tentacles) {
            ctx.drawImage(tentacle['image'], tentacle['x'], tentacle['y'], tentacle['width'], tentacle['height']);
        }

        if (octopus.checkCollision(currentDiver.currentInd)) {
            isCollision = true;
        }

        if (isCollision) {
            collisionSteps++;
        }

        if (collisionSteps == 50) {
            collisionSteps = 0;
            isCollision = false;
            let tmp = Object.assign(new Diver(), currentDiver);
            currentDiver.setDeath();
            currentDiver = secondDiver;
            secondDiver = thirdDiver;
            thirdDiver = tmp;
            secondDiver.currentInd = 1;
            currentDiver.setFirst();
            isCatchedByOctopus = true;
        }


        if (isCatchedByOctopus) {
            catchedByOctopusSteps++;
            let diverAttrs = thirdDiver.getCatchedAttrs();
            ctx.drawImage(diverAttrs['image'], diverAttrs['x'], diverAttrs['y'], diverAttrs['width'], diverAttrs['height']);
        }

        if (catchedByOctopusSteps > 0 && catchedByOctopusSteps % 20 == 0) {
            thirdDiver.setNextCatchedDiver();
        }

        if (catchedByOctopusSteps >= 140) {
            catchedByOctopusSteps = 0;
            isCatchedByOctopus = false;
        }


        var digits = ui.digits;
        for (let key of Object.keys(digits)) {
            var digit = digits[key];
            ctx.drawImage(digit['image'], digit['x'], digit['y'], digit['width'], digit['height']);
        }

        if (currentDiver.getIsOnBoatWithBag()) {
            isBagEmptyAnim = true;
        }
        if (isBagEmptyAnim) {
            bagEmptyCount++;
        } 


        if (!isBagEmptyAnim && !isCatchedByOctopus && !isCollision) {
            octopusMoveSteps++;
        }


        if (bagEmptyCount == 12 || bagEmptyCount == 20 || bagEmptyCount == 30) {
            currentDiver.bagAnimationMovement();
            ui.addScore();
            if (bagEmptyCount == 30) {
                isBagEmptyAnim = false;
                bagEmptyCount = 0;
            }
        }

        if (onBoatCount == 250) {
            currentDiver.moveRight();
        }
        if (currentDiver.getIsOnBoat()) {
            onBoatCount++;
        } else {
            onBoatCount = 0;
        }


    }, 20);
}

main();
