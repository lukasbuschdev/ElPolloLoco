/**
 * Represents a game level, containing all entities and objects required for that level.
 */
class Level {

    /** @type {Array<Enemy>} - Array of enemy objects in the level. */
    enemies;

    /** @type {Array<Cloud>} - Array of cloud objects for the background sky. */
    clouds;

    /** @type {Array<BackgroundObject>} - Array of background objects in the level. */
    backgroundObjects;

    /** @type {Array<Coin>} - Array of coin objects collectible by the character. */
    coins;

    /** @type {Array<Bottle>} - Array of bottle objects collectible by the character. */
    bottles;

    /** @type {StatusBar} - Status bar for character health. */
    statusBar;

    /** @type {StatusBarCoin} - Status bar for coins collected by the character. */
    statusBarCoin;

    /** @type {StatusBarBottle} - Status bar for bottles collected by the character. */
    statusBarBottle;

    /** @type {StatusBarEndBoss} - Status bar for the end boss's health. */
    statusBarEndboss;

    /** @type {number} - The x-coordinate where the level ends. */
    level_end_x = 2200;

    /**
     * Creates a new Level instance, initializing all elements within the level.
     * @param {Array<Enemy>} enemies - The enemies present in the level.
     * @param {Array<Cloud>} clouds - The clouds in the level's background.
     * @param {Array<BackgroundObject>} backgroundObjects - The background objects for the level.
     * @param {Array<Coin>} coins - Collectible coins in the level.
     * @param {Array<Bottle>} bottles - Collectible bottles in the level.
     * @param {StatusBar} statusBar - Status bar for character health.
     * @param {StatusBarCoin} statusBarCoin - Status bar for tracking coins collected.
     * @param {StatusBarBottle} statusBarBottle - Status bar for tracking bottles collected.
     * @param {StatusBarEndBoss} statusBarEndboss - Status bar for the end boss's health.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles, statusBar, statusBarCoin, statusBarBottle, statusBarEndboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.statusBar = statusBar;
        this.statusBarCoin = statusBarCoin;
        this.statusBarBottle = statusBarBottle;
        this.statusBarEndboss = statusBarEndboss;
    }
}