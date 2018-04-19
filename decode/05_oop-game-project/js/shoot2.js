// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 825;
var GAME_HEIGHT = 617;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 156;
var MAX_ENEMIES = 3;

var POWERUP_WIDTH = 75;
var POWERUP_HEIGHT = 156;
var MAX_POWERUPS = 2;

var PLAYER_WIDTH = 75;
var PLAYER_HEIGHT = 54;

var SHOOTER_WIDTH = 20;
var SHOOTER_HEiGHT = 23;

// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var UP_ARROW_CODE = 38;
var DOWN_ARROW_CODE = 40;
var SPACE_DOWN_ARROW_CODE = 32;

// These two constants allow us to DRY
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';

//These two constants allow us to move up and down
var MOVE_UP = 'up';
var MOVE_DOWN = 'down';

var SHOOT = 32;

// Preload game images
var images = {};
['enemy2.png', 'player.png', 'bg.png', 'bg1.png', 'bg2.png', 'bg3.png', 'bg4.png', 'powerup.png', 'shooter.png', 'powerup2.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});


let dead = false;
let pUp = false;
let deathCounter = 5;
let powerUpCounter = 0;
let app = document.getElementById("app");
let restartButton = document.createElement("button");
let snore = document.getElementById("snore");
let slurp = document.getElementById("slurp");
let oops = document.getElementById("oops")
let startButton = document.createElement("button");





class Entity {
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}


// This section is where you will be doing most of your coding
class Enemy extends Entity {
    constructor(xPos) {
        super()
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['enemy2.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2+0.15;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

}

class PowerUp extends Entity {
    constructor(xPos) {
        super()
        this.x = xPos;
        this.y = -POWERUP_HEIGHT;
        this.sprite = images['powerup.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

}


class Shooter extends Entity {
    constructor(xPos, yPos) {
        super()
        this.x = xPos+PLAYER_WIDTH/5;
        this.y = yPos;
        this.sprite = images['shooter.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.50;
    }

    update(timeDiff) {
        this.y = this.y - timeDiff * this.speed;

    }
}


class Player extends Entity {
    constructor() {
        super()
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite = images['player.png'];
    }

    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        else if (direction === MOVE_UP && this.y > 30 ) {
            this.y = this.y - PLAYER_HEIGHT;
        }
        else if (direction === MOVE_DOWN && this.y < GAME_HEIGHT - PLAYER_HEIGHT-100) {
            this.y = this.y + PLAYER_HEIGHT;
        }
    }
}


/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();


        // Setup enemies, making sure there are always three
        this.setupEnemies();
        this.setupPowerUps();
        this.setupShooters();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');
    

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupEnemies() {
        if (!this.enemies) {
            this.enemies = [];
        }

        while (this.enemies.filter(e => !!e).length < MAX_ENEMIES) {
            this.addEnemy();
        }
    }

    setupPowerUps() {
        if (!this.powerUps) {
            this.powerUps = [];
        }

        while (this.powerUps.filter(e => !!e).length < MAX_POWERUPS) {
            this.addPowerUps();
        }
    }

    setupShooters() {
        if (!this.shooters) {
            this.shooters = [];

        }
    }
    
    isContact(shape1,shape2){
        var shape1__ = {
            top : shape1.y -50,
            bottom : shape1.y +50,
            left : shape1.x,// - MAYBE_SOMETHING 
            right : shape1.x// + MAYBE_SOMETHING
        }
        var shape2__ = {
            top : shape2.y -ENEMY_HEIGHT,
            bottom : shape2.y,
            left : shape2.x,
            right : shape2.x +ENEMY_WIDTH
        }
        if(
            shape1__.bottom > shape2__.top &&
            shape1__.top < shape2__.bottom &&
            shape1__.right > shape2__.left &&
            shape1__.left < shape2__.right
        ){
            return true
        }
    }

    isEnemyDead() {

        this.enemies.forEach((ELEMENT,IDX) => {
            this.shooters.forEach((element,idx)=>{
                if(this.isContact(element,ELEMENT) === true ){

//                    let bye = document.getElementById("bye");
                    let bye = document.createElement('audio')
                    bye.src = ('./bye.mp3')
                    bye.play()
                    delete this.shooters[idx]
                    delete this.enemies[IDX]
                    
                }
            })
        })

        this.shooters.filter((element) => {
            if(element === 'empty'){debugger}
            return (element === 'empty')
        })

    }

    isPowerUpDead() {

        this.powerUps.forEach((ELEMENT,IDX) => {
            this.shooters.forEach((element,idx)=>{
                if(this.isContact(element,ELEMENT) === true ){
                    let oops = document.createElement('audio')
                    bye.src = ('./oops.mp3')
                    oops.play();
                    delete this.shooters[idx]
                    delete this.powerUps[IDX]
                    powerUpCounter--;
                   
                    
                }
            })
        })

        this.shooters.filter((element) => {
            if(element === 'empty'){debugger}
            return (element === 'empty')
        })

        

    }
    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        var enemySpots = GAME_WIDTH / ENEMY_WIDTH;
        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (enemySpot === undefined || this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * (enemySpots));

        }

        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_WIDTH);
    }

    addPowerUps() {
        var powerUpSpots = GAME_WIDTH / POWERUP_WIDTH;
        var powerUpSpot;
        // Keep looping until we find a free enemy spot at random
        while (powerUpSpot === undefined || this.powerUps[powerUpSpot]) {
            powerUpSpot = Math.floor(Math.random() * (powerUpSpots));

        }

        this.powerUps[powerUpSpot] = new PowerUp(powerUpSpot * POWERUP_WIDTH);
    }


    addShooter() {
        //put shooter where the player is. 
        this.shooters.push(new Shooter(this.player.x, this.player.y));

    }



    // This method kicks off the game
    start() {


        this.score = 0;
        this.lastFrame = Date.now();

        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', e => {
            if (e.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);

            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            }
            else if (e.keyCode === UP_ARROW_CODE) {
                this.player.move(MOVE_UP);
            }
            else if (e.keyCode === DOWN_ARROW_CODE) {
                this.player.move(MOVE_DOWN);
            }

            else if (e.keyCode === SHOOT) {
                this.addShooter()
            }
            
        });

        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill
    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        // Increase the score!
        this.score += timeDiff;



        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));
        this.powerUps.forEach(powerUp => powerUp.update(timeDiff));
        this.shooters.forEach(shooter => shooter.update(timeDiff));


        // Draw everything!
        this.ctx.drawImage(images['bg.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT); // draw the star bg
        this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies
        this.player.render(this.ctx); // draw the player
      //  this.powerUps.forEach(powerUp => powerUp.render(this.ctx)); 

        
        let lifePosition=700;
        let powerUpPosition =700;
        
        if (this.score > 6000) {
            this.ctx.drawImage(images['bg.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT);
            this.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.speed = Math.random() / 2 + 0.10 }); // draw the enemies
            this.player.render(this.ctx); // draw the player
            this.powerUps.forEach(poweredUp => poweredUp.render(this.ctx)); // draw the powerUps
        }

        if (this.score > 12000)  {
            this.ctx.drawImage(images['bg2.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT);
            this.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.speed = Math.random() / 2 + 0.10 }); // draw the enemies
            this.player.render(this.ctx); // draw the player
            this.powerUps.forEach(poweredUp => poweredUp.render(this.ctx)); // draw the powerUps

        }

        if (this.score > 18000) {
            this.ctx.drawImage(images['bg3.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT);
            this.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.speed = Math.random() / 2 + 0.15 }); // draw the enemies
            this.player.render(this.ctx); // draw the player
            this.powerUps.forEach(poweredUp => poweredUp.render(this.ctx)); // draw the powerUps
 
        }

        if (this.score > 25000) {
            this.ctx.drawImage(images['bg4.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT);
            this.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.speed = Math.random() / 2 + 0.20 }); // draw the enemies
            this.player.render(this.ctx); // draw the player
            this.powerUps.forEach(poweredUp => poweredUp.render(this.ctx)); // draw the powerUps
    
        }
        if (this.score> 35000){
            this.ctx.drawImage(images['bg1.png'], 0, 0,GAME_WIDTH,GAME_HEIGHT);
            this.enemies.forEach(enemy => { enemy.render(this.ctx); enemy.speed = Math.random() / 2 + 0.15 }); // draw the enemies
            this.player.render(this.ctx); // draw the player
            this.powerUps.forEach(powerUp => powerUp.render(this.ctx)); // draw the enemies
        }



        this.shooters = this.shooters.filter((element) => { return (element.y > 0) })

        this.shooters.forEach(shoot => shoot.render(this.ctx));


        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();

        // Check if any powerUps should die
        this.powerUps.forEach((powerUp, powerUpIdx) => {
            if (powerUp.y > GAME_HEIGHT) {
                delete this.powerUps[powerUpIdx];
            }
        });
        this.setupPowerUps();
        this.setupShooters();
        this.isEnemyDead();
        this.isPowerUpDead();

        for (let i=0; i<=deathCounter-1; i++){
            this.ctx.drawImage(images['player.png'], lifePosition,0);
            lifePosition= lifePosition-60;
                }

        for (let y=0; y<=powerUpCounter-1; y++){
            this.ctx.drawImage(images['powerup2.png'], powerUpPosition, 60)
            powerUpPosition = powerUpPosition - 40;    
        }
        // Check if player is dead
        if (this.isPlayerDead() && deathCounter != 0 && !this.isPlayerPoweredUp()) {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Courier New';

            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText("Score "+this.score, 5, 30);
            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
    
        }

        else if (this.isPlayerDead() && deathCounter === 0) {

            // If they are dead, then it's game over!
            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText("Score "+this.score + ' GAME OVER', 5, 30);
            app.appendChild(restartButton);
            restartButton.innerText = "play again?";
            restartButton.addEventListener('click', () => location.reload());
        }

        else if (this.isPlayerPoweredUp() && powerUpCounter >= 1 && powerUpCounter < 5) {
            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText("Score " +this.score, 5, 30);
            //player is not dead, show number of lives remaining

            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';
          //  this.ctx.fillText('You have ' + deathCounter + 'lives remaining', 20, 70);
           // this.ctx.fillText('You are' + powerUpCounter + '/5 away from getting a free life', 50, 100);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }

        else if (this.isPlayerPoweredUp() && powerUpCounter >= 5) {
            deathCounter++;
            powerUpCounter = 0;
            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText("Score " + this.score, 5, 30);
            //player is not dead, show number of lives remaining

            this.ctx.font = 'bold 30px Courier New';
        //    this.ctx.fillStyle = '#ffffff';
          //  this.ctx.fillText('You have ' + deathCounter + 'lives remaining', 20, 70);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }

        else {

            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText("Score " + this.score, 5, 30);
            this.ctx.font = 'bold 30px Courier New';
            this.ctx.fillStyle = '#ffffff';

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }

    }

    isPlayerDead() {

        // We use a local function because there is few littles differences in the variable settings
        function isContact(shape1,shape2){
            var shape1__ = {
                top : shape1.y -50,
                bottom : shape1.y +50,
                left : shape1.x+ENEMY_WIDTH/2,// - MAYBE_SOMETHING 
                right : shape1.x+ENEMY_WIDTH/2// + MAYBE_SOMETHING
            }
            var shape2__ = {
                top : shape2.y -ENEMY_HEIGHT,
                bottom : shape2.y,
                left : shape2.x,
                right : shape2.x +ENEMY_WIDTH
            }
            if(
                shape1__.bottom > shape2__.top &&
                shape1__.top < shape2__.bottom &&
                shape1__.right > shape2__.left &&
                shape1__.left < shape2__.right
            ){
                return true
            }
        }
    
        this.enemies.forEach((enemy, i) => {
            if(isContact(this.player,enemy) === true){
                console.log(deathCounter);

                snore.play();
                deathCounter--;
                console.log(deathCounter);
                delete this.enemies[i];
                dead = true
              
            }
        });


        return dead

        return false;
    }


    isPlayerPoweredUp() {


        function isContact(shape1,shape2){
            var shape1__ = {
                top : shape1.y -50,
                bottom : shape1.y +50,
                left : shape1.x+ENEMY_WIDTH/2,// - MAYBE_SOMETHING 
                right : shape1.x+ENEMY_WIDTH/2// + MAYBE_SOMETHING
            }
            var shape2__ = {
                top : shape2.y -ENEMY_HEIGHT,
                bottom : shape2.y,
                left : shape2.x,
                right : shape2.x +ENEMY_WIDTH
            }
            if(
                shape1__.bottom > shape2__.top &&
                shape1__.top < shape2__.bottom &&
                shape1__.right > shape2__.left &&
                shape1__.left < shape2__.right
            ){
                return true
            }
        }

        this.powerUps.forEach((poweredUp, i) => {

            if (isContact(this.player, poweredUp)===true){
                slurp.play();
                delete this.powerUps[i];
                pUp = true
                powerUpCounter++;
               
            }
        });

        return pUp

        return false;
    }




}

// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
// gameEngine.start();
var body = document.getElementById("body");
body.appendChild(startButton);
 startButton.innerText = "Ready to play?";
 
startButton.addEventListener('click',  ()=>{body.removeChild(startButton);body.style.background='none'; gameEngine.start()});