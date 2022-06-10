// for creating divs and shuffling blocks
var divblock, blockData, blockFrontImages, memoryBlockArr, blocksArray, blockFrontImagesAll, shuffledBlocks;
// for implementing flip n match logic
var currentlyFlippedArr, matchedCount, blockToMatch1, blockToMatch2;
// for implementing game info block
var flipCounter, timer, gameOn = false;

var overlays = Array.from(document.getElementsByClassName('overlay-text'));
overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
        resetGame();
        init();
        
    });
});

function startCountdown() {
    return setInterval(() => {
        this.timeRemaining--;
        this.timer.innerText = this.timeRemaining;
        if (this.timeRemaining === 0)
            this.gameOver();
    }, 1000);
}

function resetGame() {
    var elements = document.getElementsByClassName("block");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
}
//ảnh pokemon
function init() { 
    //initializing values
    gameOn = true;
     memoryBlockArr = new Array(18);
     blocksArray = [];
     blockFrontImagesAll = [];
     shuffledBlocks = [];
     currentlyFlippedArr = [];
     matchedCount = 0;     
     flipCounter = 0;
     var minutes = 2;
     var display = document.getElementById("Timer");
     blockFrontImages = ["Images/pokemon1.gif",
        "Images/pokemon2.gif",
        "Images/pokemon3.gif",
        "Images/pokemon4.gif",
        
        "Images/pokemon6.gif",
        
        "Images/pokemon8.gif",
        "Images/pokemon9.gif",
        "Images/pokemon10.gif",
        "Images/pokemon11.gif",
        "Images/pokemon12.gif",
       
        "Images/pokemon14.gif",
        "Images/pokemon16.gif",
        "Images/pokemon17.gif",
        "Images/pokemon19.gif",
        "Images/pokemon18.gif"];
    // init();
    startTimer(minutes, display);
    blockFrontImagesAll = blockFrontImages.concat(blockFrontImages);
    shuffledBlocks = shuffleBlocks(blockFrontImagesAll);
    document.getElementById("Flips").innerText = `Flips: ${flipCounter}`;
    createElements();
}



function createElements() {
    var finalCount = shuffledBlocks.length;
    for (var i = 0; i < finalCount; i++) {
        var cardFront = shuffledBlocks.pop();
        blockData = new MemoryBlock(i, cardFront, "Images/pokemonBack.jpg");
        memoryBlockArr[i] = blockData;

        divblock = document.createElement("div");
        divblockFront = document.createElement("div");
        divblockBack = document.createElement("div");
        imgFront = document.createElement("img");
        imgBack = document.createElement("img");
        divblock.id = memoryBlockArr[i].id;
        divblock.className = memoryBlockArr[i].blockCSS;
        divblockFront.className = memoryBlockArr[i].frontCSS;
        divblockBack.className = memoryBlockArr[i].backCSS;
        imgFront.src = memoryBlockArr[i].frontImage;
        imgFront.className = memoryBlockArr[i].imgCSS;
        imgBack.src = memoryBlockArr[i].backImage;
        imgBack.className = memoryBlockArr[i].imgCSS;
        divblockFront.append(imgFront);
        divblockBack.append(imgBack);
        divblock.append(divblockFront);
        divblock.append(divblockBack);
        divblock.addEventListener('click', flipBlock);
        document.getElementById("gameMainBlock").append(divblock);
    }
}

function hideElements() {
    hideBlocks = Array.from(document.getElementsByClassName('block'));
    for (var i = 0; i < hideBlocks.length; i++) {
        document.getElementById(hideBlocks[i].id).classList.remove('visible'); 
    } 
}

function shuffleBlocks(blocksArray) {
    var currentIndex = blocksArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick an element from the remaining lot...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // Swap it with the current element.
        temporaryValue = blocksArray[currentIndex];
        blocksArray[currentIndex] = blocksArray[randomIndex];
        blocksArray[randomIndex] = temporaryValue;
    }
    return blocksArray;
}

function flipBlock() {
    if (gameOn === true) {
        this.classList.add('visible');
        flipCounter += 1;
        document.getElementById("Flips").innerText = `Flips: ${flipCounter}`;


        if (blockToMatch1 !== this.id) {
            if (currentlyFlippedArr.length === 0) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch1 = this.id;
            }
            else if (currentlyFlippedArr.length === 1) {
                currentlyFlippedArr.push(this.innerHTML);
                blockToMatch2 = this.id;
                if (currentlyFlippedArr[0] === currentlyFlippedArr[1]) {
                    blocksMatched();
                }
                else {
                    gameOn = false;
                    var wait = ms => new Promise(resolve => setTimeout(resolve, ms));
                    Promise.resolve(800).then(() => wait(800)).then(() => { revertFlip(); });

                }
            }
        }
    }
}

function blocksMatched() {
    currentlyFlippedArr = [];
    matchedCount += 2;
    document.getElementById(blockToMatch1).removeEventListener('click', flipBlock);
    document.getElementById(blockToMatch2).removeEventListener('click', flipBlock);
    if (matchedCount === memoryBlockArr.length) {
       // if (matchedCount === 2) {
        var wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        Promise.resolve(1000).then(() => wait(1000)).then(() => { showWin(); });        
    }
}

function revertFlip() {
   // alert(blockToMatch1 + "  trying to revert  " + blockToMatch2);
    document.getElementById(blockToMatch1).classList.remove('visible');
    document.getElementById(blockToMatch2).classList.remove('visible');
    currentlyFlippedArr = [];
    gameOn = true;
}

function showWin() {    
    hideElements();
    gameOn = false;
    document.getElementById('winText').classList.add('visible');
    clearInterval(countdown);
}

function gameOver() {
   // hideElements();
    gameOn = false;
    document.getElementById('gameOverText').classList.add('visible');
    clearInterval(countdown);
}






