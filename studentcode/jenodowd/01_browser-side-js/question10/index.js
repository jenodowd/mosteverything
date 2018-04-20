var body = document.getElementById("body")
var div = document.getElementById("div")
var randomTime = Math.floor((Math.random() * 8000) + 2000);
var audio = new Audio('start.mp3');
var pCounter = 0;
var qCounter = 0;
var gameStart = false;
var gameEnd = false;

//Q FUNCTIONS
function qWin() {
    body.innerText = "Q won"
    qCounter = qCounter + 1;
    if (qCounter === 3) {
        body.innerText = "Q IS THE WINNER!"
    }
}

function qLose() {
    body.innerText = "Q lost"
}

//P FUNCTIONS
function pWin() {
    body.innerText = "P won"
    pCounter = pCounter + 1;
    if (pCounter === 3) {
        body.innerText = "P IS THE WINNER!"
    }
}
function pLose() {
    body.innerText = "P lost"
}

//KEYSTROKES:
body.onkeydown = function(event){
    if(event.keyCode === 81){
        if (gameStart !== true) {
        qLose();
        }
        else qWin();
    }
    else if(Number(event.keyCode) === 80){
        if (gameStart !== true){
        pLose();
        }
        else pWin();
    }
    if(qCounter === 3 || pCounter === 3) {
        restart2();
    } else {
        restart()
    }
}

//START GAME:
function start() {
    function playSound() {
        audio.play(); 
        gameStart = true;
    }
    setTimeout(playSound, randomTime)
}

//RESTART GAME
function restart() {
    var restartBtn = document.createElement('button')
    restartBtn.innerText = "RESTART"
    body.appendChild(restartBtn)
    restartBtn.addEventListener('click', start)
}

function restart2() {
    var restartBtn = document.createElement('button')
    restartBtn.innerText = "RESTART"
    body.appendChild(restartBtn)
    restartBtn.addEventListener('click', () => window.location.reload())
}

start()