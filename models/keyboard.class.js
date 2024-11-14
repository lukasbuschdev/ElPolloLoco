/**
 * Represents keyboard input for controlling the game character.
 * This class tracks both keyboard and touchscreen button states.
 */
class Keyboard {

    /** @type {boolean} - Indicates if the left arrow or left button is pressed. */
    LEFT = false;

    /** @type {boolean} - Indicates if the right arrow or right button is pressed. */
    RIGHT = false;

    /** @type {boolean} - Indicates if the up arrow or up button is pressed. */
    UP = false;

    /** @type {boolean} - Indicates if the down arrow or down button is pressed. */
    DOWN = false;

    /** @type {boolean} - Indicates if the space bar or jump button is pressed. */
    SPACE = false;

    /** @type {boolean} - Indicates if the 'D' key or throw button is pressed. */
    D = false;

    /**
     * Initializes a new instance of the `Keyboard` class and sets up event listeners for button presses.
     */
    constructor() {
        this.pressedBtnsEvents();
    }

    /**
     * Sets up event listeners for touch-based controls and updates the respective properties when buttons are pressed or released.
     */
    pressedBtnsEvents() {
        setInterval(() => {
            document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
            });
            document.getElementById('btnLeft').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
            });

            document.getElementById('btnRight').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
            });
            document.getElementById('btnRight').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
            });

            document.getElementById('btnJump').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
            });
            document.getElementById('btnJump').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
            });

            document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
            });
            document.getElementById('btnThrow').addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
            });
        }, 1000 / 60);
    }
}