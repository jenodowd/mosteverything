var body = document.getElementById("body")
var won = false;
var end = false;
var randomTime = Math.floor((Math.random() * 3000) + 1000);

function win() {
    if (end !== true) {
        body.innerText = "You won!"
        won = true;
    }
}

function endGame() {
    if (!won) {
        body.innerText = "You lost!"
    } end = true;
}

function begin() {
    body.innerText = "The round has started";
    body.addEventListener('click', win)

    
    body.addEventListener('keydown', event => {
        if (event.key == " ") {
            win();
        }
    });

    setTimeout(endGame, 500);
}

setTimeout(begin, randomTime)

