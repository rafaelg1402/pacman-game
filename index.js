const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let gridDivs = [];
let score = 0;

//28 * 28
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

//Create Board
function createBoard() {
    for (let i = 0; i < layout.length; i++) {
        let gridDiv = document.createElement('div')
        gridDiv.classList.add('square')
        grid.appendChild(gridDiv);
        gridDivs.push(gridDiv);

        if (layout[i] === 0) {
            gridDivs[i].classList.add('pac-dot');
        } else if (layout[i] === 1) {
            gridDivs[i].classList.add('wall');
        } else if (layout[i] === 2) {
            gridDivs[i].classList.add('ghost-lair')
        } else if (layout[i] === 3) {
            gridDivs[i].classList.add ('power-pellet');
            gridDivs[i].id = 'power-pellet';
        }
    }
}
createBoard();

//starting posision of pacman
let pacmanCurrentIndex = 490;
gridDivs[pacmanCurrentIndex].id = 'pacman';

//movement control
function control(e) {
    if (e.defaultPrevented) {
        return;
    }
    gridDivs[pacmanCurrentIndex].id = '';

    switch(e.code) {
        case 'ArrowDown':
            if (!gridDivs[pacmanCurrentIndex + width].classList.contains('wall') && 
                !gridDivs[pacmanCurrentIndex + width].classList.contains('ghost-lair') && 
                pacmanCurrentIndex + width < width *  width ) {
                pacmanCurrentIndex += width;
            }
            break;
        case 'ArrowUp':
            if (!gridDivs[pacmanCurrentIndex - width].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex - width].classList.contains('ghost-lair') && 
                pacmanCurrentIndex - width >= 0 ) {
                pacmanCurrentIndex -= width;
            }
            break;
        case 'ArrowLeft':
            if (!gridDivs[pacmanCurrentIndex -1].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex -1].classList.contains('ghost-lair') && 
                pacmanCurrentIndex % width !== 0) {
                pacmanCurrentIndex -= 1;
                if(pacmanCurrentIndex === 364) {
                    pacmanCurrentIndex = 391
                }
            }
            break;
        case 'ArrowRight':
            if (!gridDivs[pacmanCurrentIndex +1].classList.contains('wall') &&
                !gridDivs[pacmanCurrentIndex +1].classList.contains('ghost-lair') && 
                pacmanCurrentIndex % width < width -1) {
                pacmanCurrentIndex += 1;
                if(pacmanCurrentIndex === 391) {
                    pacmanCurrentIndex = 364
                }
            }
            break;
    }
    e.preventDefault();
    gridDivs[pacmanCurrentIndex].id = 'pacman'
    pacDotEat()
    powerPelletEat()
    checkGameOver()
    checkForWin()
}
document.addEventListener('keyup', control);

//Checking if pacman index contains a pac-dots and add score and remove class
function pacDotEat() {
    if (gridDivs[pacmanCurrentIndex].classList.contains('pac-dot')) {
        gridDivs[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.textContent = score;
    }
}

//check if power-pellet eat
function powerPelletEat() {
    if (gridDivs[pacmanCurrentIndex].classList.contains('power-pellet')) {
        gridDivs[pacmanCurrentIndex].classList.remove('power-pellet')
        score += 10;
        scoreDisplay.textContent = score;
        for(const ghost of ghosts) {
            ghost.isScared = true;
            setTimeout(function() {
                ghost.isScared = false;
            }, 10000)
        }
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className
        this.startIndex = startIndex
        this.speed = speed
        this.currentIndex = startIndex
        this.isScared = false
        this.timerId = NaN
    }
}

const ghosts = [
    new Ghost ('blinky', 348, 500),
    new Ghost ('pinky', 376, 800),
    new Ghost ('inky', 351, 600),
    new Ghost ('clyde', 379, 1000)
]

//Draw ghost onto grid
for(const ghost of ghosts) {
    gridDivs[ghost.currentIndex].classList.add(ghost.className);
    gridDivs[ghost.currentIndex].classList.add('ghost');
}

//Move ghost
for (const ghost of ghosts) {
    moveGhost(ghost)
}

//function to move ghost
function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width];
    let direction = directions[Math.floor(Math.random() * directions.length)]
    ghost.timerId = setInterval(function() {
        if (!gridDivs[ghost.currentIndex + direction].classList.contains('wall') &&
            !gridDivs[ghost.currentIndex + direction].classList.contains('ghost')) {
                gridDivs[ghost.currentIndex].classList.remove(ghost.className)
                gridDivs[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
                ghost.currentIndex += direction;
                gridDivs[ghost.currentIndex].classList.add(ghost.className)
                gridDivs[ghost.currentIndex].classList.add('ghost')
            } else direction = directions[Math.floor(Math.random() * directions.length)]
            if (ghost.isScared) {
                gridDivs[ghost.currentIndex].classList.add('scared-ghost');
            }
            if (ghost.isScared && gridDivs[ghost.currentIndex].id === 'pacman') {
                gridDivs[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.textContent = score;
                gridDivs[ghost.currentIndex].classList.add(ghost.className, 'ghost');
            }
            checkGameOver()
    }, ghost.speed)
}

//check for game over
function checkGameOver() {
    if (gridDivs[pacmanCurrentIndex].classList.contains('ghost') && 
        !gridDivs[pacmanCurrentIndex].classList.contains('scared-ghost')) {
            for(const ghost of ghosts) {
                clearInterval(ghost.timerId)
                ghost.timerId = NaN;
            }
            document.removeEventListener('keyup', control)
            document.querySelector("h3").textContent = `Game Over, Your final score was ${score}! Well done!`;
    }
}

//check for Win
function checkForWin() {
    let pacDotLeft = 0;
    for (const div of gridDivs) {
        if(div.classList.contains('pac-dot')) {
            pacDotLeft ++;
        }
    }
        if (pacDotLeft === 0) {
            for(const ghost of ghosts) {
                clearInterval(ghost.timerId)
                ghost.timerId = NaN;
            }
            document.removeEventListener('keyup', control)
            document.querySelector("h3").textContent = `You did it, Your managed to get ${score}! Well done!`;
        }
}