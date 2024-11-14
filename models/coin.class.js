/**
 * Represents a collectible coin in the game, inheriting from `MovableObject`.
 * The coin animates between two images and plays a sound when collected.
 */
class Coin extends MovableObject {

    /** @type {string[]} - Array of image paths for the coin animation. */
    Image_Coin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /** @type {Object} - Collision offset values for the coin's hitbox. */
    offset = {
        top: 50,
        left: 30,
        right: 30,
        bottom: 50
    }

    /** @type {HTMLAudioElement} - Sound effect played when the coin is collected. */
    coin_sound = new Audio('audio/coinCollected.mp3');

    /**
     * Initializes a new instance of the `Coin` class.
     * Sets the coin's initial position and begins animation.
     * @param {number} x - Initial X-coordinate for the coin.
     */
    constructor(x) {
        super().loadImage(this.Image_Coin[1]);
        this.loadImages(this.Image_Coin);
        this.x = x + Math.random() * 100;
        this.y = 100 + Math.random() * 200;
        this.animate();
    }

    /**
     * Animates the coin by alternating between images in `Image_Coin`.
     * Starts an interval to switch images every 300 milliseconds.
     */
    animate() {
        this.setStopableInterval(() => {
            this.playAnimation(this.Image_Coin);
        }, 300);
    }
}