/**
 * Represents the status bar specifically for tracking coins collected by the character.
 * Extends the `StatusBar` class.
 */
class StatusBarCoin extends StatusBar {

    /** @type {number} - The y-coordinate position of the coin status bar. */
    y = 50;

    /** @type {Array<string>} - Image paths representing different levels of coins collected. */
    Images_Coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Initializes a new instance of `StatusBarCoin`, loads the images, and sets the initial percentage to 0.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Coins);
        this.setPercentage(0, this.Images_Coins);
    } 
}