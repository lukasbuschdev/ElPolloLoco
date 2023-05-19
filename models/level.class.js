class Level {
    enemies;
    clouds;
    coins;
    backgroundObject;
    level_end_x = 2000;

    constructor(enemies, clouds, coins, backgroundObject) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObject = backgroundObject;
    }
}