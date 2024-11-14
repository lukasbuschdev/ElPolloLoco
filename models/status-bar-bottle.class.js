/**
 * Represents the status bar specifically for tracking bottles collected by the character.
 * Extends the `StatusBar` class.
 */
class StatusBarBottle extends StatusBar {

    /** @type {number} - The y-coordinate position of the bottle status bar. */
    y = 100;

    /** @type {Array<string>} - Image paths representing different levels of bottles collected. */
    Images_Bottle = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Initializes a new instance of `StatusBarBottle`, loads the images, and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Bottle);
        this.setPercentage(0, this.Images_Bottle);
    } 
}