var body = document.getElementById("body")
var div = document.getElementById("div")
var randomTime = Math.floor((Math.random() * 8000) + 2000);
var audio = new Audio('start.mp3');
var counter = 0;
var gameStart = false;
var gameEnd = false;
var img = document.createElement("img");

//SHOW IMAGE:
function show_image(src) {
    var img = document.createElement("img");
    img.src = src;
    body.appendChild(img);
}


//Q FUNCTIONS
function qWin() {
    body.innerText = "Q won"
    show_image('../stylequestion8/monkey-win.gif')
    restart()
}

function qLose() {
    body.innerText = "Q lost"
    show_image('../stylequestion8/monkey-lose.png')
    restart()
}

//P FUNCTIONS
function pWin() {
    body.innerText = "P won"
    show_image('../stylequestion8/cat-win.gif')
    restart()
}

function pLose() {
    body.innerText = "P lost"
    show_image('../stylequestion8/cat-lose.gif')
    restart()
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
    //restart()
}

//START SOUND:
function playSound() {
    audio.play(); 
    gameStart = true;
}

setTimeout(playSound, randomTime)

//RESTART
function restart() {
    var restartBtn = document.createElement('button')
    restartBtn.innerText = "RESTART"
    body.appendChild(restartBtn)
    restartBtn.addEventListener('click', () => window.location.reload())
}