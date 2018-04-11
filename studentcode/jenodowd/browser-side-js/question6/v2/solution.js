var won = false;
var lost = false;
var mainDiv = document.getElementById('app');
var body = document.getElementById('main');
var btn = document.getElementById('btn');
var start = document.getElementById('start');
var restart = document.getElementById('restart')

//var numButtons = 1 + Math.floor(Math.random() * 10)
var numButtons = 5

var btns = [];
var buttonsClicked = 0;

restart.style.display = "none";

function restartAppear() {
    restart.style.display = "";
}

function potentialLoss() {
    if (won) return;
    lost = true;
    mainDiv.innerText = "YOU LOST!";
    restartAppear();
}

function potentialWin() {
    if (lost) return;
    won = true;
    mainDiv.innerText = "YOU WON!";
    restartAppear();
}

function createBtn() {
    var btn = document.createElement("button");
    btn.style.display = "none"
    btn.style.position = "absolute"
    btn.style.left = (100 + Math.random() * 400) + 'px';
    btn.style.top = (100 + Math.random() * 400) + 'px';
    btn.innerText = "click!";
    btn.addEventListener('click', event => {
        event.stopPropagation();
        buttonsClicked++;
        btn.style.display = "none";
        if(buttonsClicked == numButtons) {
            potentialWin();
        }
    })

    btns.push(btn);
    body.appendChild(btn);
}

for (var i = 0; i < numButtons; i++) {
    createBtn();
}


function startRound() {
    mainDiv.innerText = "ROUND STARTED!";
    btns.forEach(btn => {
        btn.style.display = "";
    });
    body.addEventListener('click', () => {
        potentialLoss();
    })
    setTimeout(potentialLoss, 3000)
}

start.addEventListener('click', () => {
    start.style.display = "none";
    setTimeout(startRound, Math.random() * 2000 + 1000)
});

restart.addEventListener('click', () => {
    location.reload();
})