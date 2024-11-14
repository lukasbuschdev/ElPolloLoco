/**
 * Represents a small chicken enemy in the game, with specific dimensions, sound, and animations.
 * Extends the `Chicken` class.
 */
class SmallChicken extends Chicken {

    /** @type {number} - The height of the small chicken. */
    height = 60;

    /** @type {number} - The width of the small chicken. */
    width = 50;

    /** @type {number} - The y-coordinate position of the small chicken on the game canvas. */
    y = 370;

    /** 
     * Offset settings for collision detection of the small chicken.
     * @type {{top: number, left: number, right: number, bottom: number}} 
     */
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    };

    /** @type {HTMLAudioElement} - Sound effect for the small chicken. */
    chicken_sound = new Audio('audio/smallChicken.mp3');

    /** @type {Array<string>} - Image paths for the walking animation of the small chicken. */
    images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /** @type {string} - Image path for the dead state of the small chicken. */
    image_Dead = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    /**
     * Initializes a new instance of `SmallChicken`, sets its initial position, speed, and loads images.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.images_Walking);
        this.x = 500 + Math.random() * 800;
        this.speed = 0.15 + Math.random() * 0.2;
        this.animate();
        this.chickenRun();
    }
}