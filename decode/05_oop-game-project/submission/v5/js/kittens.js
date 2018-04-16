var body = document.getElementById('body')

// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 750
var XWIDTH = GAME_WIDTH / 2;

var GAME_HEIGHT = 400;
var YHEIGHT = GAME_HEIGHT / 2;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 3;

var PLAYER_WIDTH = 75;
var PLAYER_HEIGHT = 54;

// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var UP_ARROW_CODE = 38;
var DOWN_ARROW_CODE = 40;
var SPACEBAR_CODE = 32;

// These two constants allow us to DRY
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';
var MOVE_UP = 'up';
var MOVE_DOWN = 'down';
var SPACEBAR = 'restart';

//LIVES
var lives = 3;
var livesText;
var lifeLostText;

// Preload game images
var images = {};
['enemy.png', 'bg.jpg', 'test1.png', 'test2.png','test3.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});


// This section is where you will be doing most of your coding

class Enemy {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite = images['enemy.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Player{
    constructor() {
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite1 = images['test1.png'];
        this.sprite2 = images['test2.png'];
        this.sprite3 = images['test3.png'];

        this.imgSelector = 'sprite1'
        this.imgTimer = 0
    }

    // This method is called by the game engine when left/right arrows are pressed

    move(direction) {
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
        }
        else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
        }
        else if (direction === MOVE_UP) {
            this.y = this.y - PLAYER_HEIGHT;
        }
        else if (direction === MOVE_DOWN) {
            this.y = this.y + PLAYER_HEIGHT;
        }
    }

    //SWITCH IMAGES TO MAKE GIF ANIMATION
    render(ctx,randomMove) {
        if(this.imgTimer > 20){
            if(this.imgSelector === 'sprite1'){
                this.imgSelector = 'sprite2'
                ctx.drawImage(this[this.imgSelector], this.x+randomMove, this.y);
            }else if (this.imgSelector === 'sprite2'){
                this.imgSelector = 'sprite3'
                    ctx.drawImage(this[this.imgSelector], this.x+randomMove, this.y);}
            else{
                this.imgSelector = 'sprite1' 
                ctx.drawImage(this[this.imgSelector], this.x+randomMove, this.y);
            }
            this.imgTimer = 0
        }else{
            ctx.drawImage(this[this.imgSelector], this.x+randomMove, this.y);  
            this.imgTimer++ 
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

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);

        //PLAYER ANIMATION VARIABLES
        this.randomMove = 0
        this.shakingValue = 0
        this.shakingDirection = 0
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

    // This method finds a random spot where there is no enemy, and puts one in there
    addEnemy() {
        var enemySpots = GAME_WIDTH / ENEMY_WIDTH;

        var enemySpot;
        // Keep looping until we find a free enemy spot at random
        while (enemySpot === undefined) {
            enemySpot = Math.floor(Math.random() * enemySpots);
        }

        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_WIDTH);
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
        });
        
        document.addEventListener('keydown', e => {
        if (e.keyCode === SPACEBAR_CODE && lives > 0) {
            //window.location.reload()
            this.gameLoop()
        }
        })

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

        // Draw everything!
        this.ctx.drawImage(images['bg.jpg'], 0, 0); // draw the star bg



        //ANIMATION SHAKING MOVEMENT - 1 SPEED LEFT AND RIGHT
        
        if(this.shakingDirection === 0){
            if(this.shakingValue > 6){
                this.shakingDirection = 1
            }
            this.shakingValue = this.shakingValue + 1
        }
        if(this.shakingDirection === 1){
            if(this.shakingValue < 6){
                this.shakingDirection = 0
            }
            this.shakingValue = this.shakingValue - 1
        }

        //END ANIMATION SHAKING
        
        this.player.render(this.ctx,this.randomMove); // draw the player

        this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();


        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!

            lives = lives - 1;

            if(lives === 2) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign="center"; 

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`You're dead!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: '+ this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Press SPACEBAR to try again' , XWIDTH, YHEIGHT + 45);
            }

            if(lives === 1) {
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign="center"; 

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`You're dead!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: '+ this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Press SPACEBAR to try again' , XWIDTH, YHEIGHT + 45);
            }

            if(lives === 0) { 
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign="center"; 

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText('GAME OVER', XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: '+ this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('CLICK HERE to restart!' , XWIDTH, YHEIGHT + 45);

                document.addEventListener('click', () => window.location.reload())
           }

        }


        else if(!this.isPlayerDead()) {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 25px Helvetica';
            this.ctx.fillStyle = '#ffffff';

            this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
            this.ctx.shadowOffsetX = 0.5;
            this.ctx.shadowOffsetY = 0.5;
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign="left"; 
            this.ctx.fillText('Lives: ' + lives, 640, 30);
            this.ctx.fillText(this.score, 10, 30);

            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowBlur = 0;
            
            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }

    }




    isPlayerDead() {
        // TODO: fix this function!

        var self = this;
        
        return this.enemies.some(function (enemy) {
            return (enemy.x === self.player.x && enemy.y + ENEMY_HEIGHT >= self.player.y)
            && (enemy.y < self.player.y ) + ENEMY_HEIGHT/4;

            //return (enemy.x === self.player.x && enemy.y + ENEMY_HEIGHT > self.player.y)
            //&& (enemy.y < self.player.y ) + ENEMY_HEIGHT/4
        })

    }

}





// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();