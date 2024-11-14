/**
 * Represents the main character in the game, inheriting from `MovableObject`.
 * Handles movement, animations, and interactions within the game world.
 */
class Character extends MovableObject {
    /** @type {number} - Height of the character. */
    height = 300;

    /** @type {number} - Width of the character. */
    width = 130;

    /** @type {number} - Y-coordinate position of the character. */
    y = 30;

    /** @type {number} - Speed of the character's movement. */
    speed = 5;

    /** @type {number} - Number of coins collected by the character. */
    coins = 0;

    /** @type {number} - Number of bottles collected by the character. */
    bottles = 0;

    /** @type {Object} - Offset values for collision detection on the character. */
    offset = {
        top: 130,
        left: 40,
        right: 40,
        bottom: 15
    };
    
    /** @type {string[]} - Array of image paths for the character's walking animation. */
    images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /** @type {string[]} - Array of image paths for the character's jumping animation. */
    images_Jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    /** @type {string[]} - Array of image paths for the character's idle animation. */
    images_Idle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /** @type {string[]} - Array of image paths for the character's long idle animation. */
    images_LongIdle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /** @type {string[]} - Array of image paths for the character's dead animation. */
    images_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /** @type {string[]} - Array of image paths for the character's hurt animation. */
    images_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /** @type {HTMLAudioElement} - Sound effect for the character's walking action. */
    walking_sound = new Audio('./audio/running.mp3');

    /** @type {HTMLAudioElement} - Sound effect for the character's jumping action. */
    jump_sound = new Audio('audio/jump.mp3');

    /** @type {Object} - Reference to the game world. */
    world;

    /** @type {number} - Timestamp of the last move to determine idle state. */
    lastMoveTime;

    /**
     * Initializes a new instance of the `Character` class.
     * Loads images, applies gravity, and initiates animations and movement.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_Jumping);
        this.loadImages(this.images_Idle);
        this.loadImages(this.images_LongIdle);
        this.loadImages(this.images_Dead);
        this.loadImages(this.images_Hurt);
        this.applyGravity();
        this.animate();
        this.move();
    }

    /**
     * Controls character movement based on keyboard input.
     * Updates camera position and plays walking sound if audio is enabled.
     */
    move() {
        this.setStopableInterval(() => {
            this.walking_sound.pause();
            this.moveToRight();
            this.moveToLeft();
            this.characterJump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Moves the character to the right if the right arrow key is pressed.
     * Plays walking sound if audio is enabled.
     */
    moveToRight() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.setLastMoveTime();

            if(this.world.audio) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed.
     * Plays walking sound if audio is enabled.
     */
    moveToLeft() {
        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.setLastMoveTime();

            if(this.world.audio) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Makes the character jump if the space key is pressed and character is on the ground.
     * Plays jump sound if audio is enabled.
     */
    characterJump() {
        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.setLastMoveTime();
            if(this.world.audio) {
                this.jump_sound.play();
            }
        }
    }

    /**
     * Animates the character based on current actions and keyboard inputs.
     * Chooses appropriate animation for each state (e.g., walking, jumping, idle).
     */
    animate() {
        this.setStopableInterval(() => {
            if(this.isDead()) {
                this.playAnimation(this.images_Dead);
            } else if(this.isHurt()) {
                this.playAnimation(this.images_Hurt);
            } else if(this.isAboveGround()) {
                this.playAnimation(this.images_Jumping);
            } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.images_Walking);
            } else if(this.checkIdleTime()) {
                this.playAnimation(this.images_LongIdle);
            } else {
                this.playAnimation(this.images_Idle);
            }
        }, 100)
    }

    /**
     * Records the current time as the last move time for tracking idle status.
     */
    setLastMoveTime() {
        this.lastMoveTime = new Date().getTime();
    }

    /**
     * Checks the idle time to determine if the character should play a long idle animation.
     * @returns {boolean} - True if idle time exceeds 6 seconds, false otherwise.
     */
    checkIdleTime() {
        let idleTime = new Date().getTime() - this.lastMoveTime;
        idleTime = idleTime / 1000;
        return idleTime > 6;
    }
}