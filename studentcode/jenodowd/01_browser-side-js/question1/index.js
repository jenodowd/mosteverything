var won = false;
var end = false;

var body = document.getElementById("body")

function win() {
    if (end != true) {
    body.innerText = "You won!"
    won = true;
    }
}

body.addEventListener('click', win)

function checkWon() {
    if (!won) {
        body.innerText = "You lost!"
        end = true;
    }
}

setTimeout(checkWon, 1000);