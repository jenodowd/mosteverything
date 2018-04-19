
// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 2680;
var GAME_HEIGHT = 1580;

var ENEMY_WIDTH = 200;
var ENEMY_HEIGHT = 200;
var MAX_ENEMIES = 6;

var PLAYER_WIDTH = 264;
var PLAYER_HEIGHT = 212;

// These two constants keep us from using "magic numbers" in our code
var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;


// These two constants allow us to DRY
var MOVE_LEFT = 'left';
var MOVE_RIGHT = 'right';

// Preload game images
var images = {};

['press-start.png', 'bat-frame1.gif', 'bat-frame2.gif', 'bat-frame3.gif', 'bat-frame4.gif',
    'bat-frame5.gif', 'bat-frame6.gif', 'bat-frame7.gif', 'bat-frame8.gif',
    'city.gif', 'man.png', 'manfire1.png', 'laser.png', 'blood.png'].forEach(imgName => {

        var img = document.createElement('img');
        img.src = 'images/' + imgName;
        images[imgName] = img;
    });

var laserSound = new Audio('laser.mp3');
var gameOverSound = new Audio('game-over.mp3')
var superManTheme = new Audio('superman-theme.mp3');

// This section is where you will be doing most of your coding
class Entity {
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}



class Enemy extends Entity {
    constructor(yPos) {
        super();
        this.x = GAME_WIDTH;
        this.y = yPos + 200;
        this.sprite = images['bat-frame1.gif'];


        var arr = ['bat-frame1.gif', 'bat-frame2.gif', 'bat-frame3.gif', 'bat-frame4.gif', 'bat-frame5.gif', 'bat-frame6.gif', 'bat-frame7.gif', 'bat-frame8.gif']
        var counter = 0;
        var action = function () {
            counter = counter + 1;
            counter = (counter % arr.length)

            this.sprite = images[arr[counter]];
        }
        action = action.bind(this);
        setInterval(action, 50);

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 1;
    }

    update(timeDiff) {
        //this.y = this.y + timeDiff * this.speed;
        this.x = this.x - timeDiff * this.speed;
    }
}

class Player extends Entity {
    constructor() {
        super();
        this.x = 2 * PLAYER_WIDTH - 100;
        this.y = (GAME_HEIGHT - PLAYER_HEIGHT - 920);
        this.sprite = images['man.png'];
        this.speed = 0.4

    }

    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - 30;
        }
        else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + 30;
        }
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    jump(direction) {
        this.x = this.x
        this.y = this.y - 30
    }
    fire() {
        this.sprite = images['manfire1.png']
        laserSound.play();
    }
    unfire() {
        this.sprite = images['man.png']
    }


}

class Laser extends Entity {
    constructor(xPos, yPos) {
        super();
        this.x = xPos + 200 // 2 * PLAYER_WIDTH + xPos
        this.y = yPos + 20 //+GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite = images['laser.png'];
        this.speed = 3;
    }
    update(timeDiff) {
        this.x = this.x + timeDiff * this.speed;

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
        this.laser = [];


        // Setup enemies, making sure there are always three
        this.setupEnemies();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        canvas.id="canvas"
        document.getElementById('app').appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);


        document.addEventListener('keydown', e => {
            if (e.keyCode === 67) {
                this.laser.push(new Laser(this.player.x, this.player.y))

            }
        });
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
        var enemySpots = GAME_HEIGHT / ENEMY_HEIGHT;
        var enemySpot;
        // Keep looping until we find a free enemy spot at random


        while (enemySpot === undefined || this.enemies[enemySpot]) {
            enemySpot = Math.floor(Math.random() * enemySpots);

        }
        this.enemies[enemySpot] = new Enemy(enemySpot * ENEMY_HEIGHT);

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
            else if (e.keyCode === 32) {
                this.player.jump();
            }
            else if (e.keyCode === 67) {
                this.player.fire();
                this.laser.forEach((element) => {

                })
            }
        });


        document.addEventListener('keyup', e => {
            if (e.keyCode === 67)
                this.player.unfire();
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
        this.player.update(timeDiff)


        this.laser = this.laser.filter(element => {
            // Trouver le bon nombre
            return (element.x < 3000)
        })

        this.laser.forEach(element => {
            element.update(timeDiff)
        });

        // Draw everything!
        this.ctx.drawImage(images['city.gif'], 0, 0); // draw the star bg
        this.enemies.forEach(enemy => { enemy.render(this.ctx); }) // draw the enemies
        this.player.render(this.ctx); // draw the player
        this.laser.forEach(element => {
            element.render(this.ctx)
        });

        // Check if laser touch an enemy
        this.CheckIfLaserIsKilling()
        

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.x < 0) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();

        
        this.enemies = this.enemies.filter((element)=>{
            return (element.x > 0) 
        })

        // Check if player is dead
        if (this.isPlayerDead()) {
            this.player.sprite = images['blood.png'];
            // If they are dead, then it's game over!
            this.ctx.font = 'bold 300px Impact center';
            this.ctx.fillStyle = '#c60303';
            this.ctx.fillText('GAME OVER', 360, 550);

        }
        else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 70px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score, 47, 70);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }

    isPlayerDead() {

        function CheckContact(shape1, idx1, shape2, idx2) {
            var shape1__ = {
                top: shape1.y,
                bottom: shape1.y + ENEMY_HEIGHT / 2,
                left: shape1.x - PLAYER_WIDTH / 2,
                right: shape1.x + ENEMY_WIDTH
            }
            var shape2__ = {
                top: shape2.y,
                bottom: shape2.y + 20,
                left: shape2.x,
                right: shape2.x + 20
            }
            if (
                shape1__.bottom > shape2__.top &&
                shape2__.bottom > shape1__.top &&
                shape1__.right > shape2__.left &&
                shape2__.right > shape1__.left
            ) {
                superManTheme.pause();
                gameOverSound.play();
             
                return true
                
            } else {
                return false
            }
        }

        let x = false
        if (this.player.y > GAME_HEIGHT - 180 || this.player.y < -40) {
            x = true;
        }

        return(this.enemies.some((element, idx) => {
            return CheckContact(element, idx, this.player, 0)
        }))

    }
    
    CheckIfLaserIsKilling() {
        function CheckContact(shape1, idx1, shape2, idx2) {
            var shape1__ = {
                top: shape1.y,
                bottom: shape1.y + ENEMY_HEIGHT,
                left: shape1.x,
                right: shape1.x + ENEMY_WIDTH
            }
            var shape2__ = {
                top: shape2.y,
                bottom: shape2.y + 50,
                left: shape2.x,
                right: shape2.x + 50
            }
            if (
                shape1__.bottom > shape2__.top &&
                shape2__.bottom > shape1__.top &&
                shape1__.right > shape2__.left &&
                shape2__.right > shape1__.left
            ) {

                
                return true
            } else {
                return false
            }
        }
        this.enemies.some((ELEMENT, IDX) => {
            
            this.laser.some((element, idx) => {
                
                return CheckContact(ELEMENT, IDX, element, idx)
            })
        })

        this.enemies.forEach((ELEMENT, IDX) => {
            
            this.laser.forEach((element, idx) => {
                if (CheckContact(ELEMENT, IDX, element, idx)) {
                    setTimeout(() => {this.enemies[IDX].sprite = images['blood.png']}, 50)
                    
                    delete this.laser[idx]
                    delete this.enemies[IDX]
                }
            })
        })


    }

}


// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));

document.addEventListener('keydown', e => {
    if (e.keyCode === 32) {
        gameEngine.start();
        superManTheme.volume = 0.4
        superManTheme.play();
        document.getElementById('startbutton').style.display = 'none';
    }
})


function GoPro(){
    gameEngine.start();
    superManTheme.volume = 0.4
    superManTheme.play();
    document.getElementById('startbutton').style.display = 'none';
}