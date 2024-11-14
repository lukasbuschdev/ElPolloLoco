/**
 * Represents a bottle object that can be collected or thrown by the character.
 * Inherits from `MovableObject`.
 */
class Bottle extends MovableObject {

    /** @type {number} - Height of the bottle. */
    height = 65;

    /** @type {number} - Width of the bottle. */
    width = 55;

    /** @type {string[]} - Array of image paths for the bottle on the ground. */
    Image_Bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /** @type {Object} - Offset values for collision detection on the bottle. */
    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    };

    /**
     * Initializes a new instance of the `Bottle` class.
     * Sets a random x-position for the bottle on the ground.
     * @param {number} x - The x-coordinate where the bottle should be placed.
     */
    constructor(x) {
        super().loadImage(this.Image_Bottle[this.bottleOnGround()]);
        this.x = x + Math.random() * 65;
        this.y = 375;
    }

    /**
     * Determines if the bottle should use the first or second ground image.
     * @returns {number} - 0 for the first image, 1 for the second, based on a probability.
     */
    bottleOnGround() {
        let i = Math.random();
        return i < 0.8 ? 0 : 1;
    }
}