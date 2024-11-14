/**
 * Represents the end screen of the game, extending `DrawableObject` to render the screen's appearance.
 */
class Endscreen extends DrawableObject {
    
    /**
     * Initializes a new instance of `Endscreen` with default width, height, and position.
     */
    constructor() {
        super();
        
        /** @type {number} - The width of the end screen. */
        this.width = 720;

        /** @type {number} - The height of the end screen. */
        this.height = 480;

        /** @type {number} - The x-coordinate of the end screen's position. */
        this.x = 20;

        /** @type {number} - The y-coordinate of the end screen's position. */
        this.y = 0;
    }
}