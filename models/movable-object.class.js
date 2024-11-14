/**
 * Represents a movable object in the game, capable of moving, jumping, and detecting collisions.
 * Extends the `DrawableObject` class.
 */
class MovableObject extends DrawableObject {
    /** @type {number} - Horizontal movement speed. */
    speed = 0.2;

    /** @type {boolean} - Determines if the object is facing in the opposite direction. */
    otherDirection = false;

    /** @type {number} - Vertical speed, primarily for jumping and falling. */
    speedY = 0;

    /** @type {number} - Acceleration for downward movement, affecting gravity. */
    acceleration = 2.5;

    /** @type {number} - The current energy or health of the object. */
    energy = 100;

    /** @type {number} - Timestamp of the last hit taken. */
    lastHit = 0;

    /** @type {boolean} - Flag to indicate if the object has been deleted. */
    deleted = false;

    /** @type {Array<number>} - Holds interval IDs to be cleared when necessary. */
    Intervals = [];

    /** @type {object} - Reference to the game world, if applicable. */
    world;

    /** 
     * Collision offset settings for the movable object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object, decreasing its vertical position over time.
     */
    applyGravity() {
        this.setStopableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }
    
    /**
     * Checks if the object is above ground level.
     * @returns {boolean} - True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        const groundLevel = this instanceof ThrowableObject || this instanceof Chicken ? 350 : 130;
        return this.y < groundLevel;
    }
    
    /**
     * Sets an interval that can be stopped later, storing its ID.
     * @param {Function} fn - The function to be called at each interval.
     * @param {number} time - The interval time in milliseconds.
     */
    setStopableInterval(fn, time) {
        const id = setInterval(fn, time);
        this.Intervals.push(id);
    }
    
    /**
     * Clears all stored intervals for the object.
     */
    clearIntervals() {
        this.Intervals.forEach(clearInterval);
        this.Intervals = [];
    }
    
    /**
     * Checks if this object is colliding with another.
     * @param {MovableObject} mo - The other movable object to check against.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
            this.x + this.offset.left <= mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top <= mo.y + mo.height - mo.offset.bottom
        );
    }
    
    /**
     * Reduces the object's energy by a specified value and records the time of the hit.
     * @param {number} value - The amount of energy to subtract.
     */
    hit(value) {
        this.energy = Math.max(0, this.energy - value);
        if (this.energy > 0) {
            this.lastHit = Date.now();
        }
    }
    
    /**
     * Checks if the object was recently hurt.
     * @returns {boolean} - True if hurt within the last 0.5 seconds, false otherwise.
     */
    isHurt() {
        return (Date.now() - this.lastHit) / 1000 < 0.5;
    }
    
    /**
     * Checks if the object is dead (no energy left).
     * @returns {boolean} - True if energy is 0, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }
    
    /**
     * Plays an animation from an array of images by cycling through them.
     * @param {Array<string>} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        const i = this.currentImage % images.length;
        this.img = this.imageCache[images[i]];
        this.currentImage++;
    }
    
    /**
     * Moves the object to the right by a specified speed.
     * @param {number} [speed=this.speed] - The speed to move, defaults to object's speed property.
     */
    moveRight(speed = this.speed) {
        this.x += speed;
    }
    
    /**
     * Moves the object to the left by a specified speed.
     * @param {number} [speed=this.speed] - The speed to move, defaults to object's speed property.
     */
    moveLeft(speed = this.speed) {
        this.x -= speed;
    }
    
    /**
     * Makes the object jump by setting an upward speed.
     * @param {boolean} [low=false] - If true, sets a lower jump speed.
     */
    jump(low = false) {
        this.speedY = low ? 20 : 35;
    }
    
    /**
     * Initiates a rush attack by increasing speed and making the object jump if on the ground.
     */
    rushAttack() {
        this.speed = 3;
        if (!this.isAboveGround()) {
            this.jump(true);
        }
    }    
}