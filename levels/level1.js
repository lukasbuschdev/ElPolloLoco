/**
 * The main level instance for the game.
 * @type {Level}
 */
let level1;

/**
 * Creates an array of enemy objects to populate the game level.
 * @returns {Array<Chicken | SmallChicken | Endboss>} An array of enemy instances.
 */
function createEnemys() {
    return [
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Chicken(),
        new SmallChicken(),
        new Endboss()
    ];
}

/**
 * Creates an array of cloud objects for the game's background.
 * @returns {Array<Cloud>} An array of cloud instances.
 */
function createClouds() {
    return [new Cloud()];
}

/**
 * Creates an array of background objects for the game level.
 * Each object represents a layer in the parallax background effect.
 * @returns {Array<BackgroundObject>} An array of background objects with image paths and positions.
 */
function createBackground() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3)
    ];
}

/**
 * Starts the game by initializing the level with enemies, clouds, background, coins, and bottles.
 * Sets up the status bars for health, coins, bottles, and end boss health.
 * Hides the start screen and displays the game level.
 */
function start() {
    let enemys = createEnemys();
    let clouds = createClouds();
    let background = createBackground();

    let coins = [];
    let bottles = [];
    let statusBar = new StatusBar();
    let statusBarCoin = new StatusBarCoin();
    let statusBarBottle = new StatusBarBottle();
    let statusBarEndboss = new StatusBarEndBoss();

    for (let i = 1; i < 15; i++) {
        coins.push(new Coin(i * 100));
    }

    for (let i = 1; i < 10; i++) {
        bottles.push(new Bottle(i * 100));
    }

    level1 = new Level(enemys, clouds, background, coins, bottles, statusBar, statusBarCoin, statusBarBottle, statusBarEndboss);

    document.querySelector('#startscreen').classList.add('d-none');
}