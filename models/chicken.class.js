/**
 * Represents a chicken enemy in the game, inheriting from `MovableObject`.
 * Chickens can move, animate, and respond to player interactions.
 */
class Chicken extends MovableObject {

    /** @type {number} - Y-coordinate position of the chicken on the ground. */
    y = 350;

    /** @type {number} - Height of the chicken image. */
    height = 80;

    /** @type {number} - Width of the chicken image. */
    width = 70;

    /** @type {string[]} - Array of image paths for the chicken's walking animation. */
    images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /** @type {string} - Image path for the dead state of the chicken. */
    image_Dead = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    /** @type {Object} - Offset values for collision detection on the chicken. */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 5
    };

    /** @type {HTMLAudioElement} - Sound effect played when the chicken is interacted with. */
    chicken_sound = new Audio('audio/chicken.mp3');

    /**
     * Initializes a new instance of the `Chicken` class.
     * Sets a random initial X-coordinate, speed, and begins movement and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.x = 500 + Math.random() * 1200;
        this.speed = 0.15 + Math.random() * 0.25;
        this.applyGravity();
        this.animate();
        this.chickenRun();
    }

    /**
     * Initiates the continuous leftward movement of the chicken to simulate roaming.
     */
    chickenRun() {
        this.setStopableInterval(() => {
            this.moveLeft(this.speed); 
        }, 1000 / 60);
    }

    /**
     * Animates the chicken, switching between walking and dead images based on energy.
     * Changes the chicken's image if its energy reaches 0.
     */
    animate() {
        this.setStopableInterval(() => {
            if(this.energy <= 0) {
                this.loadImage(this.image_Dead);
                this.speed = 0;
            } else {
               this.playAnimation(this.images_Walking);
            }     
        }, 200);
    }   
}
