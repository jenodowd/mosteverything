var won = false;
var end = false;
var body = document.getElementById("body")
//var randomTime = Math.floor((Math.random() * 3000) + 1000);

// body.innerHTML = `<button id = "button"></button>`
// var btn = document.getElementById("button")

function game() {

    body.innerHTML = `<button id = "button">Click Me</button>`
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
        btn.style.left = Math.floor((Math.random() * 1000) + 1); +'px';
        btn.style.top = Math.floor((Math.random() * 800) + 1); +'px';
    }

    moveBtn()

}


//function start() {
//    startBtn.innerText = "Click to START"
//    startBtn.addEventListener('click', game())

//}

//body.innerHTML = `<button id = "start"></button>`
//var startBtn = document.getElementById("start")

function add(type) {
    //Create an input type dynamically.   
    var element = document.createElement("input");
    //Assign different attributes to the element. 
    element.type = type;
    element.value = 'Start'; // Really? You want the default value to be the type string?
    element.name = 'startBtn'; 
    element.id = 'start';
    element.onclick = function () { // Note this is a function
        game()
    };
    var _parent = document.getElementById("body");
    //Append the element in page (in span).  
    _parent.appendChild(element);
}
add("button");


console.log(document.getElementById('start').onclick)

