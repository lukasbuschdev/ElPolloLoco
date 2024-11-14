/**
 * Represents a background object in the game, which is a static image that fills part of the game scene.
 * Inherits from `MovableObject`.
 */
class BackgroundObject extends MovableObject {

    /** @type {number} - Width of the background object. */
    width = 720;

    /** @type {number} - Height of the background object. */
    height = 480;

    /**
     * Initializes a new instance of the `BackgroundObject` class.
     * Sets the background image and its x and y coordinates.
     * @param {string} imagePath - The path to the image for the background object.
     * @param {number} x - The x-coordinate where the background object should be placed.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Positions the background at the bottom of the screen.
    }
}