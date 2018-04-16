var body = document.getElementById('body')

// This sectin contains some game constants. It is not super interesting
var GAME_WIDTH = 750
var XWIDTH = GAME_WIDTH / 2;

var GAME_HEIGHT = 500;
var YHEIGHT = GAME_HEIGHT / 2;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 2;

var FRIEND_WIDTH = 75;
var FRIEND_HEIGHT = 75;
var MAX_FRIENDS = 2;

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

//RANDOM TIMES
var randomTime = Math.floor((Math.random() * 0.2) + 1)
var randomTime2 = Math.floor((Math.random() * 1) + 1.8)


// Preload game images
var images = {};
['enemy.png', 'bg.jpg', 'test1.png', 'test2.png', 'test3.png', 'bonus.png', 'bullet.png', 'pill.png', 'heart.png'].forEach(imgName => {
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


class Clouds {
    constructor() {
        this.x = 0;
        this.y = 100;
        this.sprite1 = images['bullet.png'];

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
        this.sprite1 = images['bullet.png'];

        this.imgTimer = 0
    }


    render(ctx, shakingValue) {

        ctx.drawImage(this.sprite1, this.x + shakingValue, this.y);
        this.imgTimer++

    }
}


class Heart1 {
    constructor() {
        this.x = 400;
        this.y = 5;
        this.sprite = images['heart.png'];
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
    
}

class Heart2 {
    constructor() {
        this.x = 450;
        this.y = 5;
        this.sprite = images['heart.png'];
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Heart3 {
    constructor() {
        this.x = 500;
        this.y = 5;
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
        this.sprite = images['bonus.png'];

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


class Player {
    constructor() {
        this.x = 2 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 10;
        this.sprite1 = images['test1.png'];
        this.sprite2 = images['test2.png'];
        this.sprite3 = images['test3.png'];
        this.sprite4 = images['bullet.png'];

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
    render(ctx, randomMove) {
        if (this.imgTimer > 20) {
            if (this.imgSelector === 'sprite1') {
                this.imgSelector = 'sprite2'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            } else if (this.imgSelector === 'sprite2') {
                this.imgSelector = 'sprite3'
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

    renderLeft(ctx, randomMove) {
        if (this.imgTimer > 20) {
            if (this.imgSelector === 'sprite4') {
                this.imgSelector = 'sprite4'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            } else if (this.imgSelector === 'sprite4') {
                this.imgSelector = 'sprite4'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }
            else {
                this.imgSelector = 'sprite4'
                ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
            }
            this.imgTimer = 0
        } else {
            ctx.drawImage(this[this.imgSelector], this.x + randomMove, this.y);
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
        //this.playerleft = new PlayerLeft();

        this.setupPlayer()

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
        this.player = [this.player, this.player];
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
                this.player[1].move(MOVE_LEFT);
            }
            else if (e.keyCode === RIGHT_ARROW_CODE) {
                this.player[1].move(MOVE_RIGHT);
            }
            else if (e.keyCode === UP_ARROW_CODE) {
                this.player[0].move(MOVE_UP);
            }
            else if (e.keyCode === DOWN_ARROW_CODE) {
                this.player[0].move(MOVE_DOWN);
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

        this.clouds.render(this.ctx, this.shakingValue);

        this.clouds2.render(this.ctx, this.shakingValue2);

        this.heart1.forEach(heart1 => heart1.render(this.ctx))

        this.enemies.forEach(enemy => enemy.render(this.ctx)); // draw the enemies

        this.friends.forEach(friend => friend.render(this.ctx)); // draw the enemies

        this.player.forEach(player => player.render(this.ctx, this.randomMove))

 

        // Check if any enemies should die
        this.enemies.forEach((enemy, enemyIdx) => {
            if (enemy.y > GAME_HEIGHT) {
                delete this.enemies[enemyIdx];
            }
        });
        this.setupEnemies();


        this.friends.forEach((friend, friendIdx) => {
            if (friend.y > this.player[0].y) {
                delete this.friends[friendIdx];
            }
        });
        this.setupFriends();



        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!

            lives = lives - 1;
            
            if (lives === 2) {
                delete this.heart1[0]
                document.removeEventListener('click', this.gameLoop)
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign = "center";
                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`You're dead!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: ' + this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Press SPACEBAR to try again', XWIDTH, YHEIGHT + 45);
            }
            
            if (lives === 1) {
                delete this.heart1[1]
                this.ctx.fillStyle = '#ffffff';
                this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
                this.ctx.shadowOffsetX = 0.5;
                this.ctx.shadowOffsetY = 0.5;
                this.ctx.shadowBlur = 5;
                this.ctx.textAlign = "center";

                this.ctx.font = 'bold 40px Helvetica';
                this.ctx.fillText(`You're dead!`, XWIDTH, YHEIGHT - 18);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Your score is: ' + this.score, XWIDTH, YHEIGHT + 15);
                this.ctx.font = '20px Helvetica';
                this.ctx.fillText('Press SPACEBAR to try again', XWIDTH, YHEIGHT + 45);

            }

            if (lives === 0) {
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
                this.ctx.fillText('CLICK HERE to restart!', XWIDTH, YHEIGHT + 45);
                

                document.addEventListener('click', () => window.location.reload())
                
            }

        }

        if (this.friendBonus()) {
            this.score = this.score + 1000;

            this.ctx.fillStyle = '#ffffff';
            this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
            this.ctx.shadowOffsetX = 0.5;
            this.ctx.shadowOffsetY = 0.5;
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign = "center";

            this.ctx.font = 'bold 20px Helvetica';
            this.ctx.fillText('1000pts!', XWIDTH, YHEIGHT);
            this.ctx.textAlign = "left";
            this.ctx.font = 'bold 25px Helvetica';
            this.ctx.fillText('Lives: ' + lives, 640, 30);
            this.ctx.fillText(this.score, 10, 30);

            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowOffsetX = 0;
            this.ctx.shadowOffsetY = 0;
            this.ctx.shadowBlur = 0;

            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }


        else if (!this.isPlayerDead()) {
            //document.removeEventListener('click', gameLoop)
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 25px Helvetica';
            this.ctx.fillStyle = '#ffffff';

            this.ctx.shadowColor = 'rgb(0,0,0,0.5)';
            this.ctx.shadowOffsetX = 0.5;
            this.ctx.shadowOffsetY = 0.5;
            this.ctx.shadowBlur = 5;
            this.ctx.textAlign = "left";
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

        var self = this;

        return this.enemies.some(function (enemy) {
            return (enemy.x === self.player[0].x && enemy.y + ENEMY_HEIGHT >= self.player[0].y)
                && (enemy.y < self.player[0].y) + ENEMY_HEIGHT / 4;

        })

    }

    friendBonus() {

        var self = this;

        return this.friends.some(function (friend) {
            return (friend.x === self.player[0].x && friend.y + FRIEND_HEIGHT >= self.player[0].y)
                && (friend.y < self.player[0].y) + FRIEND_HEIGHT / 4;

        })

    }
}


// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();
