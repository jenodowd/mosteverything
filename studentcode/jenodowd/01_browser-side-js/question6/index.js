var body = document.getElementById('body')
var won = false;
var end = false;
var counter = 0;

//RANDOM NUMBER GENERATOR:
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


//FIRST MAKE THE BUTTONS
function makeButtons() {
    for (var i = 1; i < 6; i++) {
        var button = document.createElement('button')
        button.innerText = `BUTTON ${i}`
        document.body.appendChild(button)
    }
    return button;
}

makeButtons()

//CODE TO MOVE BUTTONS RANDOMLY
function moveBtn(btn) {
    var height = body.offsetHeight;
    var width = body.offsetWidth;
    var x = getRndInteger(0, width - 100);
    var y = getRndInteger(0, height - 80);

    btn.style.position = "absolute";
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}


//MAKE EACH BUTTON RUN 'CODE TO MOVE BUTTONS RANDOMLY'
var buttonArray = document.getElementsByTagName("button")

function moveEach() {
    for (var i = 0; i < buttonArray.length; i++) {
        moveBtn(buttonArray[i])
    }
}

moveEach()


//GAME FUNCTIONS

function game(buttonClick) {

        buttonClick.addEventListener('click', win)
        body.addEventListener('click', clickAnywhereElse)
        
        function win(event) {
            event.stopPropagation()
            counter = counter + 1;

            if (counter == 5) {
                body.innerText = "You won!";
                won = true;
             }

            if (end !== true) {
                //won = true;
                buttonClick.remove()
            }
        }

        function checkWon() {
            if (won !== true) {
                end = true;
                buttonClick.remove()

                body.innerText = "You lost!"
            } 
        }

        function clickAnywhereElse() {
            body.innerText = "You lost!"
        }
    
        setTimeout(checkWon, 4000);

}

//RUN GAME FOR EACH BUTTON

function runGameForEachButton() {
    for(var i = 0; i < buttonArray.length; i++) {
        game(buttonArray[i])
    }
}

runGameForEachButton()