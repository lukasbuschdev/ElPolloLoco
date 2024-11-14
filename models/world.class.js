/**
 * Represents the game world, handling the game canvas, characters, enemies, and interactions.
 */
class World {
    /** @type {Character} */
    character = new Character();
    
    /** @type {Level} */
    level = level1;
    
    /** @type {HTMLCanvasElement} */
    canvas;
    
    /** @type {CanvasRenderingContext2D} */
    ctx;
    
    /** @type {Keyboard} */
    keyboard;
    
    /** @type {number} */
    camera_x = 0;
    
    /** @type {Array<ThrowableObject>} */
    throwableObjects = [];
    
    /** @type {number} */
    lastThrowTime;
    
    /** @type {Array<number>} */
    Intervals = [];
    
    /** @type {Array<number>} */
    allIntervals = [];
    
    /** @type {boolean} */
    gameOver = false;
    
    /** @type {boolean} */
    endFight = false;
    
    /** @type {boolean} */
    audio = localStorage.getItem('audio') === 'false' ? false : true;

    /**
     * Initializes the World object, setting up the canvas, character, keyboard, and starting the game loop.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard input handler for player controls.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.lastThrowTime = new Date().getTime();
    }

    /**
     * Links the character and enemies to this world instance for interaction.
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    /**
     * Sets an interval and adds it to the list of stoppable intervals.
     * @param {Function} fn - The function to execute at each interval.
     * @param {number} time - Interval time in milliseconds.
     */
    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.Intervals.push(id);
    }

    /**
     * Clears all intervals stored in the Intervals array.
     */
    clearIntervals() {
        this.Intervals.forEach(clearInterval);
        this.character.clearIntervals();
    }

    /**
     * The main game loop, responsible for checking collisions, enemy actions, and other updates.
     */
    run() {
        this.setStopableInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.deleteThrowObject();
            this.chickenAttack();
            this.enemyDead();
            this.endbossFight();
            this.checkEnd();
        }, 1000 / 60);
    }

    /**
     * Checks if the required cooldown time has passed for throwing an object.
     * @returns {boolean} True if enough time has passed to allow another throw.
     */
    lastThrow() {
        return (new Date().getTime() - this.lastThrowTime) / 1000 > 0.5;
    }
    
    /**
     * Checks if the player can throw an object and initiates the throw if possible.
     */
    checkThrowObjects() {
        if(this.keyboard.D && this.character.bottles > 0 && this.character.energy > 0 && !this.gameOver && this.lastThrow()) {
            const direction = this.character.otherDirection ? 'left' : 'right';
            this.throwBottle(direction);
        }
    }
    
    /**
     * Creates a throwable object and initiates the throw in the specified direction.
     * @param {string} direction - Direction to throw the bottle ('left' or 'right').
     */
    throwBottle(direction) {
        const xOffset = direction === 'right' ? 100 : 0;
        const bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, direction === 'left' ? 'reverse' : undefined);
        this.throwableObjects.push(bottle);
        this.lastThrowTime = new Date().getTime();
        this.character.setLastMoveTime();
        this.character.bottles -= 10;
        this.level.statusBarBottle.setPercentage(this.character.bottles, this.level.statusBarBottle.Images_Bottle);
    }
    
    /**
     * Initiates a rush attack for enemies within range of the character.
     */
    chickenAttack() {
        this.level.enemies.forEach(enemy => {
            if(enemy.x - this.character.x < 400 && enemy.energy > 0) {
                enemy.rushAttack();
            }
        });
    }
    
    /**
     * Removes throwable objects that have no energy left or have hit the ground.
     */
    deleteThrowObject() {
        this.throwableObjects = this.throwableObjects.filter(object => {
            if((object.energy === 0 || !object.isAboveGround()) && !object.deleted) {
                object.deleted = true;
                setTimeout(() => {
                    object.clearIntervals();
                }, 200);
                return false;
            }
            return true;
        });
    }    

    /**
     * Marks an enemy as deleted, plays audio if enabled, and removes it after a delay.
     * @param {Enemy} enemy - The enemy to delete.
     * @param {number} index - Index of the enemy in the array.
     */
    markEnemyAsDeleted(enemy, index) {
        enemy.deleted = true;
        if(this.audio) {
            enemy.chicken_sound.play();
        }
    
        setTimeout(() => {
            if(enemy.deleted) {
                enemy.clearIntervals();
                enemy.chicken_sound.pause();
                this.level.enemies.splice(index, 1);
            }
        }, 1000);
    }
    
    /**
     * Checks if any enemies have zero energy and marks them as deleted.
     */
    enemyDead() {
        this.level.enemies.forEach((enemy, index) => {
            if(enemy.energy === 0 && !enemy.deleted) {
                this.markEnemyAsDeleted(enemy, index);
            }
        });
    }
    
    /**
     * Checks if the end boss fight should be initiated.
     */
    endbossFight() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss && (this.character.x >= 1300 || enemy.activate)) {
                if(enemy.energy > 0 && !enemy.isHurt()) {
                    enemy.run(this.character);
                }
                this.endFight = true;
                enemy.activate = true;
            }
        });
    }    

    /**
     * Checks if the game should end based on character or end boss state.
     */
    checkEnd() {
        this.checkIfCharacterDead();
        this.checkIfEndbossDead();
    }

    /**
     * Ends the game after a specified delay, displaying the appropriate message.
     * @param {number} delay - Time in milliseconds to delay the end.
     * @param {string} elementId - ID of the element to show as the game-over message.
     */
    endGame(delay, elementId) {
        setTimeout(() => {
            this.gameOver = true;
            document.querySelector(elementId).classList.remove('d-none');
            this.clearIntervals();
            this.character.walking_sound.pause();
        }, delay);
    }
    
    /**
     * Checks if the end boss has been defeated and ends the game if true.
     */
    checkIfEndbossDead() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss && enemy.energy <= 0 && !this.gameOver && this.character.energy > 0) {
                this.endGame(1000, '#gameOver');
            }
        });
    }
    
    /**
     * Checks if the character has died and ends the game if true.
     */
    checkIfCharacterDead() {
        if(this.character.energy <= 0 && !this.gameOver) {
            this.endGame(500, '#lost');
        }
    }

    /**
     * Checks for collisions between the character and various game objects.
     */
    checkCollisions() {
        if(!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.collisionWithChicken(enemy);
                this.collisionWithEndboss(enemy);
            });
        }
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.collisionWithThrowableObject();
    }

    /**
     * Checks for collisions between throwable objects and enemies, ground, or end boss.
     */
    collisionWithThrowableObject() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(e => {
                this.bottleHitsEnemy(e, bottle);
                this.bottleHitsGround(bottle);
                this.bottleHitsEndboss(e);
            });
        });
    }

    /**
     * Checks if a bottle collides with an enemy and applies damage if conditions are met.
     * @param {Object} e - The enemy to check for collision.
     * @param {ThrowableObject} bottle - The throwable object.
     */
    bottleHitsEnemy(e, bottle) {
        if(e.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround()) {
            e.hit(100);
            bottle.hit(100);
            if(this.audio) {
                bottle.bottle_sound.play();
                e.chicken_sound.play();
            }
        }
    }

    /**
     * Checks if a bottle has hit the ground and stops its horizontal movement.
     * @param {ThrowableObject} bottle - The throwable object.
     */
    bottleHitsGround(bottle) {
        if(!bottle.isAboveGround()) {
            bottle.speedX = 0;
            if(this.audio && bottle.energy > 0) {
                bottle.bottle_sound.play();
            }
        }
    }

    /**
     * Updates the end boss's health bar if a bottle collides with it.
     * @param {Object} e - The enemy, specifically an end boss.
     */
    bottleHitsEndboss(e) {
        if(e instanceof Endboss) {
            this.level.statusBarEndboss.setPercentage(e.energy / 4.5, this.level.statusBarEndboss.Images_Health);
        }
    }

    /**
     * Checks for collisions between the character and items (bottles or coins).
     * @param {Array} itemArray - The array of items to check collisions with.
     * @param {string} itemType - Type of the item ('bottle' or 'coin').
     */
    checkCollision(itemArray, itemType) {
        for(let i = 0; i < itemArray.length; i++) {
            let item = itemArray[i];
            if(this.character.isColliding(item)) {
                itemArray.splice(i, 1);
                i--;

                if(itemType === 'bottle') {
                    this.character.bottles += 10;
                    this.level.statusBarBottle.setPercentage(this.character.bottles, this.level.statusBarBottle.Images_Bottle);
                } else if(itemType === 'coin') {
                    this.character.coins += 10;
                    if(this.audio) item.coin_sound.play();
                    this.level.statusBarCoin.setPercentage(this.character.coins, this.level.statusBarCoin.Images_Coins);
                }
            }
        }
    }

    /**
     * Checks for collisions between the character and bottles.
     */
    collisionWithBottle() {
        this.checkCollision(this.level.bottles, 'bottle');
    }

    /**
     * Checks for collisions between the character and coins, and pauses any coin sound if present.
     */
    collisionWithCoin() {
        this.level.coins.forEach(coin => coin.coin_sound.pause());
        this.checkCollision(this.level.coins, 'coin');
    }

    /**
     * Checks for collisions between the character and a chicken enemy.
     * @param {Object} enemy - The chicken enemy to check for collision.
     */
    collisionWithChicken(enemy) {
        if(this.character.isColliding(enemy) && enemy.energy > 0 && enemy instanceof Chicken) {
            if(!this.character.isAboveGround()) {
                this.character.hit(5);
                this.level.statusBar.setPercentage(this.character.energy, this.level.statusBar.Images_Health);
            } else {
                enemy.energy -= 100;
                this.character.jump('low');
            }
        }
    }

    /**
     * Checks for collisions between the character and the end boss enemy.
     * @param {Object} enemy - The end boss enemy to check for collision.
     */
    collisionWithEndboss(enemy) {
        if(this.character.isColliding(enemy) && enemy.energy > 0 && enemy instanceof Endboss) {
            this.character.hit(20);
            this.level.statusBar.setPercentage(this.character.energy, this.level.statusBar.Images_Health);
        }
    }

    /**
     * Draws the entire game scene, including characters, enemies, items, and background elements.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        if(!this.gameOver) {
            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.throwableObjects);
        }

        this.ctx.restore();

        if(!this.gameOver) {
            this.addToMap(this.level.statusBar);
            this.addToMap(this.level.statusBarCoin);
            this.addToMap(this.level.statusBarBottle);
            if(this.endFight) {
                this.addToMap(this.level.statusBarEndboss);
            }
        }

        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds an array of objects to the canvas map.
     * @param {Array} objects - The array of objects to be drawn on the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds a single object to the canvas map and flips it if necessary.
     * @param {Object} mo - The movable object to add to the map.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image horizontally before drawing.
     * @param {Object} mo - The object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation after drawing.
     * @param {Object} mo - The object to reset after flipping.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}