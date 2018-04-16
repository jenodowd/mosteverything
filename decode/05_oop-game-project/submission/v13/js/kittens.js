var body = document.getElementById('body')
var logo = document.getElementById('homescreen')


// This sectin contains some game constants. It is not super interesting
var footsteps = new Audio('feet.mp3')
var yum = new Audio('yum.mp3')
var eww = new Audio('eww.mp3')

var GAME_WIDTH = 800;
var XWIDTH = GAME_WIDTH / 2;

var GAME_HEIGHT = 500;
var YHEIGHT = GAME_HEIGHT / 2;

var ENEMY_WIDTH = 100;
var ENEMY_HEIGHT = 100;
var MAX_ENEMIES = 2;

var FRIEND_WIDTH = 100;
var FRIEND_HEIGHT = 100;
var MAX_FRIENDS = 2;

var PLAYER_WIDTH = 100;
var PLAYER_HEIGHT = 118;

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

//RANDOM TIMES
var randomTime = Math.floor((Math.random() * 0.2) + 1)
var randomTime2 = Math.floor((Math.random() * 1) + 1.8)


// Preload game images
var images = {};
['playerdead.png','moveLeft1.png','moveLeft2.png',/*'moveLeft3.png',*/'moveRight1.png','moveRight2.png',/*'moveRight3.png'*/,'bg.jpg', 'heart.png','cloud1.png','cloud2.png', 'donut.png', 'donut2.png', 'player.png', 'player2.png', 'salad.png', 'salad2.png', 'mountaintop.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});



// This section is where you will be doing most of your coding

class Enemy {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ENEMY_HEIGHT;
        this.sprite1 = images['salad.png'];
        this.sprite2 = images['salad2.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;

        this.imgSelector = 'sprite1'
        this.imgTimer = 0;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    // render(ctx) {
    //     ctx.drawImage(this.sprite, this.x, this.y);
    // }

    render(ctx, randomMove) {
        if (this.imgTimer > 20) {
            if (this.imgSelector === 'sprite1') {
                this.imgSelector = 'sprite2'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }    
            // } else if (this.imgSelector === 'sprite2') {
            //     this.imgSelector = 'sprite3'
            //     ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            // }
            else {
                this.imgSelector = 'sprite1'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }
            this.imgTimer = 0
        } else {
            ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            this.imgTimer++
        }
    }
}


class Clouds {
    constructor() {
        this.x = 0;
        this.y = 100;
        this.sprite1 = images['cloud1.png'];

        this.imgTimer = 0
    }


    render(ctx, shakingValue2) {

        ctx.drawImage(this.sprite1, this.x + shakingValue2, this.y);
        this.imgTimer++

    }
}

class Clouds2 {
    constructor() {
        this.x = GAME_WIDTH / 2;
        this.y = 50;
        this.sprite1 = images['cloud2.png'];

        this.imgTimer = 0
    }


    render(ctx, shakingValue) {

        ctx.drawImage(this.sprite1, this.x + shakingValue, this.y);
        this.imgTimer++

    }
}


class Heart1 {
    constructor() {
        this.x = 650;
        this.y = 10;
        this.sprite = images['heart.png'];
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    
}

class Heart2 {
    constructor() {
        this.x = 700;
        this.y = 10;
        this.sprite = images['heart.png'];
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Heart3 {
    constructor() {
        this.x = 750;
        this.y = 10;
        this.sprite = images['heart.png'];
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Friend {
    constructor(xPos) {
        this.x = xPos;
        this.y = -FRIEND_HEIGHT;
        this.sprite1 = images['donut.png'];
        this.sprite2 = images['donut2.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.25;

        this.imgSelector = 'sprite1'
        this.imgTimer = 0;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx, randomMove) {
        if (this.imgTimer > 20) {
            if (this.imgSelector === 'sprite1') {
                this.imgSelector = 'sprite2'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }    
            else {
                this.imgSelector = 'sprite1'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }
            this.imgTimer = 0
        } else {
            ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            this.imgTimer++
        }
    }
}


class Player {
    constructor() {
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite1 = images['player.png'];
        this.sprite2 = images['player2.png'];
        this.spriteDead = images['playerdead.png'];

        this.spriteLeft1 = images['moveLeft1.png'];
        this.spriteRight1 = images['moveRight1.png'];
        this.spriteLeft2 = images['moveLeft2.png'];
        this.spriteRight2 = images['moveRight2.png'];

        //this.spriteLeft3 = images['moveLeft1.png']
        //this.spriteRight3 = images['moveRight1.png']
        this.walkingAnimationFrame = 0
        this.walkingAnimationDelay = 0
        this.imgSelector = 'sprite1'
        this.imgTimer = 0
        this.movingLeft = false
        this.movingRight = false
    }

    // This method is called by the game engine when left/right arrows are pressed

    move(direction) {
        if (direction === MOVE_LEFT && this.x > 0) {
            this.x = this.x - PLAYER_WIDTH;
            this.movingLeft = true
        }
        else if (direction === MOVE_RIGHT && this.x < GAME_WIDTH - PLAYER_WIDTH) {
            this.x = this.x + PLAYER_WIDTH;
            this.movingRight = true
        }
        else if (direction === MOVE_UP && this.y > 0 + 300) {
            this.y = this.y - PLAYER_HEIGHT;

        }
        else if (direction === MOVE_DOWN && this.y < GAME_HEIGHT - PLAYER_HEIGHT * 2) {
            this.y = this.y + PLAYER_HEIGHT;
            
        }
    }

    stopMovingSideway(){
        this.movingLeft = false
        this.movingRight = false
    }

    //SWITCH IMAGES TO MAKE GIF ANIMATION
    render(ctx) {
        if(this.movingLeft === true || this.movingRight === true){
            if(this.movingLeft === true){
                if(this.walkingAnimationDelay%3 === 0){
                    this.imgSelector = 'spriteLeft'+(this.walkingAnimationFrame%2+1) 
                    this.walkingAnimationFrame++
                }
                this.walkingAnimationDelay++
                ctx.drawImage(this[this.imgSelector], this.x, this.y);
            }else{
                if(this.walkingAnimationDelay%3 === 0){
                    this.imgSelector = 'spriteRight'+(this.walkingAnimationFrame%2+1)
                    this.walkingAnimationFrame++
                }
                this.walkingAnimationDelay++
                ctx.drawImage(this[this.imgSelector], this.x, this.y);
                this.imgTimer++
            }
        }
        //MAIN GIF ANIMATION
        else{
            if (this.imgTimer > 20) {
                if (this.imgSelector === 'sprite1') {
                    this.imgSelector = 'sprite2'
                    ctx.drawImage(this[this.imgSelector], this.x, this.y);
                }    
                else {
                    this.imgSelector = 'sprite1'
                    ctx.drawImage(this[this.imgSelector], this.x, this.y);
                }
                this.imgTimer = 0
            } else {
                ctx.drawImage(this[this.imgSelector], this.x, this.y);
                this.imgTimer++
            }
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


        this.player = new Player();


        //this.setupPlayer()

        this.clouds = new Clouds();

        this.clouds2 = new Clouds2();

        this.heart1 = new Heart1();
        this.heart2 = new Heart2();
        this.heart3 = new Heart3();

        this.setupHearts();


        // Setup enemies, making sure there are always three
        this.setupEnemies();

        // Setup FRIENDS, making sure there are always two
        this.setupFriends();

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
        this.shakingValue2 = 0
        this.shakingDirection2 = 0
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


    setupFriends() {
        if (!this.friends) {
            this.friends = [];
        }

        while (this.friends.filter(e => !!e).length < MAX_FRIENDS) {
            this.addFriend();
        }
    }

    setupHearts() {
        this.heart1 = [this.heart1, this.heart2, this.heart3];
    }

    setupPlayer() {
        this.player = [this.player];
    }


    // This method finds a random spot where there is no enemy, and puts one in there

    addFriend() {
        var friendSpots = GAME_WIDTH / FRIEND_WIDTH;

        var friendSpot;
        // Keep looping until we find a free enemy spot at random
        while (friendSpot === undefined) {
            friendSpot = Math.floor(Math.random() * friendSpots);
        }

        this.friends[friendSpot] = new Friend(friendSpot * FRIEND_WIDTH);
    }

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
                footsteps.play();
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
                footsteps.play()
            }
            else if (e.keyCode === UP_ARROW_CODE) {
                this.player.move(MOVE_UP);
                footsteps.play()
            }
            else if (e.keyCode === DOWN_ARROW_CODE) {
                this.player.move(MOVE_DOWN);
                footsteps.play()
            }
        });
        // Listen for keyboard left/right and update the player
        document.addEventListener('keyup', e => {
            if (e.keyCode === LEFT_ARROW_CODE) {
                this.player.stopMovingSideway()
                footsteps.pause();
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                this.player.stopMovingSideway()
                footsteps.pause()
            }
        });



        document.addEventListener('keydown', e => {
            if (e.keyCode === SPACEBAR_CODE && lives > 0) {
                this.gameLoop()
            }
        })


        document.addEventListener('click', this.gameLoop)
        
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
        logo.innerHTML = "";
        //audio.play()
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        // Increase the score!
        this.score += timeDiff;

        //ANIMATION SHAKING MOVEMENT - 1 SPEED LEFT AND RIGHT

        //MOVE FIRST CLOUD
        if (this.shakingDirection === 0) {
            if (this.shakingValue > GAME_WIDTH) {
                this.shakingDirection = 1
            }
            this.shakingValue = this.shakingValue + randomTime;
        }
        if (this.shakingDirection === 1) {
            if (this.shakingValue < - GAME_WIDTH) {
                this.shakingDirection = 0
            }
            this.shakingValue = this.shakingValue - randomTime;
        }


        //MOVE SECOND CLOUD
        if (this.shakingDirection2 === 0) {
            if (this.shakingValue2 > GAME_WIDTH / 2) {
                this.shakingDirection2 = 1
            }
            this.shakingValue2 = this.shakingValue2 + randomTime2;
        }
        if (this.shakingDirection2 === 1) {
            if (this.shakingValue2 < - GAME_WIDTH / 2) {
                this.shakingDirection2 = 0
            }
            this.shakingValue2 = this.shakingValue2 - randomTime2;
        }


        //END ANIMATION SHAKING

        // Call update on all enemies
        this.enemies.forEach(enemy => enemy.update(timeDiff));

        this.friends.forEach(friend => friend.update(timeDiff));

        

        // Draw everything!

        this.ctx.drawImage(images['bg.jpg'], 0, 0); // draw the star bg

        this.clouds2.render(this.ctx, this.shakingValue2);

        this.ctx.drawImage(images['mountaintop.png'], 0, 0); 

        this.clouds.render(this.ctx, this.shakingValue);

        

 

        this.enemies.forEach(enemy => enemy.render(this.ctx, this.randomMove)); // draw the enemies

        this.friends.forEach(friend => friend.render(this.ctx, this.randomMove)); // draw the enemies

        this.heart1.forEach(heart1 => heart1.render(this.ctx, this.randomMove))

        this.player.render(this.ctx)

       //this.player.render(this.ctx, this.randomMove)

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();


        this.friends.forEach((friend, friendIdx) => {
            if (friend.y > GAME_HEIGHT - (GAME_HEIGHT - this.player.y)) {
                delete this.friends[friendIdx];
            } 
        });
        this.setupFriends();



        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!

            lives = lives - 1;
            
            if (lives === 2) {

                this.player.sprite1 = this.player.spriteDead;

                eww.play()
                delete this.heart1[0]
                document.removeEventListener('click', this.gameLoop)
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign = "center";
                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`Eww!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: ' + this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = 'bold 18px Helvetica';

                this.ctx.shadowColor = '#ffffff';
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.shadowBlur = 0;

                this.ctx.fillStyle = '#614040';
                this.ctx.fillText('PRESS THE SPACEBAR TO TRY AGAIN', XWIDTH, YHEIGHT + 45);
            }
            
            if (lives === 1) {
                this.player.sprite1 = this.player.spriteDead;
                eww.play()
                delete this.heart1[1]
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign = "center";

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`Bleck!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: ' + this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = 'bold 18px Helvetica';

                this.ctx.shadowColor = '#ffffff';
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.shadowBlur = 0;

                this.ctx.fillStyle = '#614040';
                this.ctx.fillText('PRESS THE SPACEBAR TO TRY AGAIN', XWIDTH, YHEIGHT + 45);

            }

            if (lives === 0) {
                this.player.sprite1 = this.player.spriteDead;

                eww.play()

                delete this.heart1[2]
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign = "center";

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText('GAME OVER', XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: ' + this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';

                this.ctx.shadowColor = '#ffffff';
                this.ctx.shadowOffsetX = 0;
                this.ctx.shadowOffsetY = 0;
                this.ctx.shadowBlur = 0;

                this.ctx.font = 'bold 18px Helvetica';
                this.ctx.fillStyle = '#614040';
                this.ctx.fillText('CLICK HERE RESTART', XWIDTH, YHEIGHT + 45);
                

                document.addEventListener('click', () => window.location.reload())
                
            }

        }

        if (this.friendBonus() && !this.isPlayerDead()) {
            //this.player.spriteDead = this.player.sprite1
            yum.play()
            this.score = this.score + 1000;

            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
            this.ctx.shadowOffsetX = 0.5;
            this.ctx.shadowOffsetY = 0.5;
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign = "center";

            this.ctx.font = 'bold 18px Helvetica';
            this.ctx.fillText('1000pts!', XWIDTH, YHEIGHT);
            this.ctx.textAlign = "left";
            this.ctx.fillText('SCORE: ' + this.score, 10, 25);

            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowBlur = 0;

            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }


        else if (!this.isPlayerDead()) {

            this.player.spriteDead = this.player.sprite1;
            //document.removeEventListener('click', gameLoop)
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 18px Helvetica';
            this.ctx.fillStyle = '#ffffff';

            this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
            this.ctx.shadowOffsetX = 0.5;
            this.ctx.shadowOffsetY = 0.5;
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign = "left";
            this.ctx.fillText('SCORE: ' + this.score, 10, 25);

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

        var self = this;

        return this.enemies.some(function (enemy) {
            return (enemy.x === self.player.x && enemy.y + ENEMY_HEIGHT >= self.player.y + 20)
                && (enemy.y < self.player.y) + ENEMY_HEIGHT - 100;

        })

    }

    friendBonus() {

        var self = this;

        return this.friends.some(function (friend) {
            return (friend.x === self.player.x && friend.y + FRIEND_HEIGHT >= self.player.y + 20)
                && (friend.y < self.player.y) + FRIEND_HEIGHT - 100;
        })
        
    }
}


// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();
