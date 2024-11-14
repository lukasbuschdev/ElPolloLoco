class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    deleted = false;
    Intervals = [];
    world;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    applyGravity() {
        this.setStopableInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    
    isAboveGround() {
        const groundLevel = this instanceof ThrowableObject || this instanceof Chicken ? 350 : 130;
        return this.y < groundLevel;
    }
    
    setStopableInterval(fn, time) {
        const id = setInterval(fn, time);
        this.Intervals.push(id);
    }
    
    clearIntervals() {
        this.Intervals.forEach(clearInterval);
        this.Intervals = [];
    }
    
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
        );
    }
    
    hit(value) {
        this.energy = Math.max(0, this.energy - value);
        if(this.energy > 0) {
            this.lastHit = Date.now();
        }
    }
    
    isHurt() {
        return (Date.now() - this.lastHit) / 1000 < 0.5;
    }
    
    isDead() {
        return this.energy === 0;
    }
    
    playAnimation(images) {
        const i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
    
    moveRight(speed = this.speed) {
        this.x += speed;
    }
    
    moveLeft(speed = this.speed) {
        this.x -= speed;
    }
    
    jump(low = false) {
        this.speedY = low ? 20 : 35;
    }
    
    rushAttack() {
        this.speed = 3;
        if(!this.isAboveGround()) {
            this.jump(true);
        }
    }    
}