var won = false;
var end = false;

var body = document.getElementById("body")

body.innerHTML = `<button id = "button">click me</button>`
var btn = document.getElementById("button")

function win() {
    if (end != true) {
    btn.innerText = "You won!"
    won = true;
    }
}

function checkWon() {
    if (won !== true) {
        btn.innerText = "You lost!"
        end = true;
    }
}

btn.addEventListener('click', win)

setTimeout(checkWon, 1500);

function moveBtn(x_pos, y_pos) {
    btn.style.position = "absolute";
    btn.style.left = Math.floor((Math.random() * 1000) + 1);+'px';
    btn.style.top = Math.floor((Math.random() * 800) + 1);+'px';
  }

  moveBtn()

 