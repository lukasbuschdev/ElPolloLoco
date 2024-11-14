/**
 * Represents a throwable object in the game, such as a bottle, which can be thrown by the character.
 * Extends the `MovableObject` class.
 */
class ThrowableObject extends MovableObject {
    /**
     * Collision offset settings for the throwable object.
     * @type {{top: number, left: number, right: number, bottom: number}}
     */
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    
    /** @type {boolean} - Indicates if the throwable object has been deleted. */
    deleted = false;
    
    /** @type {number} - Horizontal speed of the throwable object. */
    speedX = 5;
    
    /** @type {HTMLAudioElement} - Sound effect for the bottle. */
    bottle_sound = new Audio('audio/bottle.mp3'); 

    /** @type {Array<string>} - Image paths for the bottle hit animation. */
    images_Hit = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    
    /** @type {Array<string>} - Image paths for the bottle spin animation. */
    images_Spin = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Initializes a new instance of a ThrowableObject.
     * @param {number} x - The initial x-coordinate of the object.
     * @param {number} y - The initial y-coordinate of the object.
     * @param {string} [reverse] - If set to 'reverse', the object will be thrown to the left.
     */
    constructor(x, y, reverse) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_Hit);
        this.loadImages(this.images_Spin);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw(reverse);
        this.animate();
    }

    /**
     * Animates the throwable object, switching between hit and spin animations.
     */
    animate() {
        setInterval(() => {
            if (this.isHurt() || !this.isAboveGround()) {
                this.playAnimation(this.images_Hit);
            } else if (!this.isHurt() && this.isAboveGround()) {
                this.playAnimation(this.images_Spin);
            }
        }, 100);
    }
    
    /**
     * Initiates the throwing motion, applying gravity and moving the object in the specified direction.
     * @param {string} [reverse] - If 'reverse', the object is thrown to the left.
     */
    throw(reverse) {
        this.speedY = 30;
        this.applyGravity();

        if (this.throwInterval) clearInterval(this.throwInterval);
    
        const direction = reverse === 'reverse' ? -1 : 1;
        this.throwInterval = setInterval(() => {
            this.x += this.speedX * direction;
        }, 25);
    }  
}