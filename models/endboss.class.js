/**
 * Represents the Endboss in the game, inheriting from `MovableObject`.
 * Manages the Endboss's animations, movement, and sounds.
 */
class Endboss extends MovableObject {

    /** @type {number} - Width of the Endboss. */
    width = 300;

    /** @type {number} - Height of the Endboss. */
    height = 400;

    /** @type {number} - Y-coordinate of the Endboss's position. */
    y = 50;

    /** @type {number} - Initial energy level of the Endboss. */
    energy = 500;

    /** @type {boolean} - Indicates if the Endboss is active in the fight. */
    activate = false;

    /** @type {number} - Speed of the Endboss. */
    speed = 20;

    /** @type {Object} - Collision offset values for the Endboss's hitbox. */
    offset = {
        top: 80,
        left: 50,
        right: 50,
        bottom: 10
    };

    /** @type {boolean} - Tracks if the Endboss is moving to the right. */
    right = false;

    /** @type {Array<string>} - Image paths for the Endboss's walking animation. */
    images_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    /** @type {Array<string>} - Image paths for the Endboss's idle animation. */
    images_Idle = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    /** @type {Array<string>} - Image paths for the Endboss's hurt animation. */
    images_IsHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    /** @type {Array<string>} - Image paths for the Endboss's death animation. */
    images_IsDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /** @type {HTMLAudioElement} - Sound effect for the Endboss. */
    chicken_sound = new Audio('./audio/chicken.mp3');

    /**
     * Initializes a new instance of the `Endboss` class, setting its initial position and loading images.
     */
    constructor() {
        super().loadImage(this.images_Idle[0]);
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_IsHurt);
        this.loadImages(this.images_IsDead);
        this.loadImages(this.images_Idle);
        this.x = 1700;
        this.animate();
    }

    /**
     * Moves the Endboss towards the character when within a certain range, adjusting direction when close.
     * @param {Character} character - The character the Endboss targets.
     */
    run(character) {
        const targetDistance = 300;
        const closeDistance = 100;
        const speed = 4;
    
        if(this.x > character.x - targetDistance && !this.right) {
            this.moveLeft(speed);
            this.otherDirection = false;
            if(this.x <= character.x - closeDistance) {
                this.right = true;
            }
        } else if(this.x < character.x + targetDistance && this.right) {
            this.moveRight(speed);
            this.otherDirection = true;
            if(this.x >= character.x) {
                this.right = false;
            }
        }
    }
    
    /**
     * Plays the appropriate animation for the Endboss based on its current state:
     * walking, idle, hurt, or dead.
     */
    animate() {
        this.setStopableInterval(() => {
            if(this.energy <= 0) {
                this.playAnimation(this.images_IsDead);
            } else if(this.isHurt()) {
                this.playAnimation(this.images_IsHurt);
            } else if(this.activate) {
                this.playAnimation(this.images_Walking);
            } else {
                this.playAnimation(this.images_Idle);
            }
        }, 200);
    }
}