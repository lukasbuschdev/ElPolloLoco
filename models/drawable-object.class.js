/**
 * Represents a drawable object within the game, with properties for position, dimensions, and image management.
 */
class DrawableObject {

    /** @type {number} - X-coordinate of the object's position. */
    x = 120;

    /** @type {number} - Y-coordinate of the object's position. */
    y = 280;

    /** @type {HTMLImageElement} - The main image of the object. */
    img;

    /** @type {number} - Height of the object. */
    height = 150;

    /** @type {number} - Width of the object. */
    width = 100;

    /** @type {Object<string, HTMLImageElement>} - Cache of images for the object. */
    imageCache = {};

    /** @type {number} - Index of the current image used for animations. */
    currentImage = 0;

    /** @type {boolean} - Indicates if the hitbox should be rendered around the object. */
    hitboxrender = false;

    /**
     * Loads a single image and sets it as the object's main image.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object's current image on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the object will be drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an array of images into the image cache for animations or multiple states.
     * @param {string[]} arr - An array of paths to the image files.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws a red frame (hitbox) around the object, useful for debugging.
     * Only draws if `hitboxrender` is true and the object is a specific type.
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the hitbox will be drawn.
     */
    drawFrame(ctx) {
        if(this.hitboxrender) {
           if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin || this instanceof ThrowableObject || this instanceof Bottle) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'red';
                ctx.rect(
                    this.x + this.offset.left, 
                    this.y + this.offset.top, 
                    this.width - this.offset.left - this.offset.right, 
                    this.height - this.offset.top - this.offset.bottom
                );
                ctx.stroke();
            } 
        }       
    }
}