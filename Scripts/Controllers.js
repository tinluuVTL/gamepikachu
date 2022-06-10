// Player as Class
var countdown;
class Player {
    // Special constructor method
    constructor(name, score, turnTotal, avatar, spot) {
        // Set properties
        this.name = name;
        this.score = score;
        this.turnTotal = turnTotal;
        this.avatar = avatar;
        this.spot = spot;

    }
}

class Tiles {
    constructor(id, width, height, x, y, snake, ladder, next) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.snake = snake;
        this.ladder = ladder;
        this.next = next;
}

}


class Blocks {
    constructor(id, className, innerText, bgColor, snake, ladder, next) {
        this.id = id;
        this.className = className;
        this.innerText = innerText;
        this.bgColor = bgColor;
        this.snake = snake;
        this.ladder = ladder;
        this.next = next;
    }

}



class MemoryBlock {
    constructor(id, frontImage, backImage) {
        this.id = id;
        this.blockCSS = "block";
        this.frontImage = frontImage;
        this.backImage = backImage;
        this.front = false;
        this.back = true;
        this.frontCSS = "block-front block-face";
        this.backCSS = "block-back block-face";
        this.imgCSS = "block-value";
        
    }
}
//Thời gian chơi//
function startTimer(duration, display) {
    var timer = 120 * duration, minutes, seconds;
    countdown = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `Time ${ minutes }:${ seconds }`;
        if (--timer < 0) {
            gameOver();
        }
    }, 1000);
}

class gameInfo {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
      //  this.timer = document.getElementById('time-remaining');
        this.flips = 0;
    }
}

