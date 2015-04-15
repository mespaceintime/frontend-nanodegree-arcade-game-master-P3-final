/* ******* Variables ******* */
var currentPlayer;
var x;
var y;
var speed;
var dist;
var begin = false;
var player1 = false;

/* ******* Enemies ******* */
// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    'use strict';
    this.sprite = 'images/enemy-bug.png';

    this.row = Math.random() * 400;
    this.column = 70 + (Math.floor(Math.random() * 2) * 85);
    this.speed = (Math.random() * 110) + 85;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dist = dt * this.speed;
    this.row += dist;

    if (this.row > 400) {
        this.row = -55;
    }

//Defining the edges of the enemy for collision detection
    this.top = this.column;
    this.left = this.row;
    this.right = this.row + 55;
    this.bottom = this.column + 55;

    if(player1) {
        this.checkCollision(this, player);
    }
};

//Player enemy intersection
Enemy.prototype.intersectRect = function(r1, r2) {
        return !(r1.top > r2.bottom || r1.left > r2.right || r1.right < r2.left || r1.bottom < r2.top);
};

//Player enemy collision, reset player
Enemy.prototype.checkCollision = function(r1, r2) {
    if(this.intersectRect(r1, r2)) {
            player.resetPosition();
    }
};

//Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {  
    ctx.drawImage(Resources.get(this.sprite), this.row, this.column);
};

/* ******* Player ******* */
var Player = function(x, y) {
    // Initializing
    this.sprite = 'images/char-princess-girl.png';
    this.row = x;
    this.column = y;
};

// Move player
Player.prototype.update = function() {
    player1 = true;
    this.top = this.column;
    this.left = this.row;
    this.right = this.row + 55;
    this.bottom = this.column + 55;
};

// Draw player 
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.row, this.column);
};

// Player starting position
Player.prototype.resetPosition = function() {
    this.row = 400;
    this.column = 400;
};

Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        if (this.row > 55) {
            this.row = this.row - 100;
        }
    }
    if (key === 'up') {
        if (this.column > 100) {
            this.column = this.column - 55;
        } else {
            this.resetPosition();
        }
    }
    if (key === 'right') {
        if (this.row < 400) {
            this.row = this.row + 100;
        }
    }
    if (key === 'down') {
        if (this.column < 400) {
            this.column = this.column + 55;
        }
    }
};

var bug1 = new Enemy(120,120);
var bug2 = new Enemy(220,220);
var bug3 = new Enemy(320,320);
var allEnemies = [
  bug1, 
  bug2, 
  bug3
  ];
var player = new Player(400, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});