class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    lastThrowTime;
    Intervals = [];
    allIntervals = []
    gameOver = false;
    endFight = false;
    audio = localStorage.getItem('audio') === 'false' ? false : true;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.lastThrowTime = new Date().getTime();
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    setStopableInterval(fn, time) {
        let id = setInterval(fn, time);
        this.Intervals.push(id);
    }

    clearIntervals() {
        this.Intervals.forEach(clearInterval);
        this.character.clearIntervals();
    }

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

    lastThrow() {
        return (new Date().getTime() - this.lastThrowTime) / 1000 > 0.5;
    }
    
    checkThrowObjects() {
        if(this.keyboard.D && this.character.bottles > 0 && this.character.energy > 0 && !this.gameOver && this.lastThrow()) {
            const direction = this.character.otherDirection ? 'left' : 'right';
            this.throwBottle(direction);
        }
    }
    
    throwBottle(direction) {
        const xOffset = direction === 'right' ? 100 : 0;
        const bottle = new ThrowableObject(this.character.x + xOffset, this.character.y + 100, direction === 'left' ? 'reverse' : undefined);
        this.throwableObjects.push(bottle);
        this.lastThrowTime = new Date().getTime();
        this.character.setLastMoveTime();
        this.character.bottles -= 10;
        this.level.statusBarBottle.setPercentage(this.character.bottles, this.level.statusBarBottle.Images_Bottle);
    }
    
    chickenAttack() {
        this.level.enemies.forEach(enemy => {
            if(enemy.x - this.character.x < 400 && enemy.energy > 0) {
                enemy.rushAttack();
            }
        });
    }
    
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
    
    enemyDead() {
        this.level.enemies.forEach((enemy, index) => {
            if(enemy.energy === 0 && !enemy.deleted) {
                this.markEnemyAsDeleted(enemy, index);
            }
        });
    }
    
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

    checkEnd() {
        this.checkIfCharacterDead();
        this.checkIfEndbossDead();
    }

    endGame(delay, elementId) {
        setTimeout(() => {
            this.gameOver = true;
            document.querySelector(elementId).classList.remove('d-none');
            this.clearIntervals();
            this.character.walking_sound.pause();
        }, delay);
    }
    
    checkIfEndbossDead() {
        this.level.enemies.forEach(enemy => {
            if(enemy instanceof Endboss && enemy.energy <= 0 && !this.gameOver && this.character.energy > 0) {
                this.endGame(1000, '#gameOver');
            }
        });
    }
    
    checkIfCharacterDead() {
        if(this.character.energy <= 0 && !this.gameOver) {
            this.endGame(500, '#lost');
        }
    }
    

    checkCollisions() {
        if(!this.character.isHurt()) {
            this.level.enemies.forEach((enemy) => {
                this.collisionWithChicken(enemy);
                this.collisionWithEndboss(enemy);
            });
        };
        this.collisionWithCoin();
        this.collisionWithBottle();
        this.collisionWithThrowableObject();
    }

    collisionWithThrowableObject() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(e => {
                this.bottleHitsEnemy(e, bottle);
                this.bottleHitsGround(bottle);
                this.bottleHitsEndboss(e);
            });
        });
    }

    bottleHitsEnemy(e, bottle) {
        if(e.isColliding(bottle) && bottle.energy > 0 && bottle.isAboveGround()) {
            e.hit(100);
            bottle.hit(100);
            if(this.audio) {
                bottle.bottle_sound.play();
                e.chicken_sound.play();
            }
        };
    }

    bottleHitsGround(bottle) {
        if(!bottle.isAboveGround()) {
            bottle.speedX = 0;
            if(this.audio && bottle.energy > 0) {
                bottle.bottle_sound.play();
            }
        }
    }

    bottleHitsEndboss(e) {
        if(e instanceof Endboss) {
            this.level.statusBarEndboss.setPercentage(e.energy / 4.5, this.level.statusBarEndboss.Images_Health);
        }
    }

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
    
    collisionWithBottle() {
        this.checkCollision(this.level.bottles, 'bottle');
    }
    
    collisionWithCoin() {
        this.level.coins.forEach(coin => coin.coin_sound.pause());
        this.checkCollision(this.level.coins, 'coin');
    }
    
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
    
    collisionWithEndboss(enemy) {
        if(this.character.isColliding(enemy) && enemy.energy > 0 && enemy instanceof Endboss) {
            this.character.hit(20);
            this.level.statusBar.setPercentage(this.character.energy, this.level.statusBar.Images_Health);
        }
    }    

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

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}