var won = false;
var end = false;
var body = document.getElementById("body")


function game() {

    body.innerHTML = `<button id = "button">Click Me</button>`
    var btn = document.getElementById("button")

    function win() {
        if (end !== true) {
            btn.innerText = "You won!"
            won = true;
            btn.remove()
            restart()
        }
    }

    function checkWon() {
        if (won !== true) {
            btn.innerText = "You lost!"
            end = true;
            btn.remove()
            restart()
        }
    }

    btn.addEventListener('click', win)

    setTimeout(checkWon, 1500);

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    function moveBtn() {
        var height = body.offsetHeight;
        var width = body.offsetWidth;
        var x =  getRndInteger(0, width - 100);
        var y =  getRndInteger(0, height - 80);
        // var y =  Math.floor((Math.random() * (height - 80)) + 0);
        btn.style.position = "absolute";
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
    }

    moveBtn()

}


function start() {

    var startBtn = document.createElement('button')
    startBtn.innerText = "START GAME"
    body.appendChild(startBtn)

    startBtn.addEventListener('click', game)

}


function restart() {

    var restartBtn = document.createElement('button')
    restartBtn.innerText = "RESTART"
    body.appendChild(restartBtn)

    restartBtn.addEventListener('click', () => window.location.reload())

}


start()