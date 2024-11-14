/**
 * Represents the status bar specifically for the end boss in the game.
 * Extends the `StatusBar` class.
 */
class StatusBarEndBoss extends StatusBar {

    /** @type {number} - The y-coordinate position of the end boss's status bar. */
    y = 50;
    
    /** @type {number} - The x-coordinate position of the end boss's status bar. */
    x = 500;

    /** @type {Array<string>} - Image paths representing different health levels for the end boss. */
    Images_Health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Initializes a new instance of `StatusBarEndBoss`, loads the images, and sets the initial percentage to 100.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Health);
        this.setPercentage(100, this.Images_Health);
    } 
}