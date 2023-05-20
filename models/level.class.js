class Level {
    enemies;
    clouds;
    coins;
    backgroundObject;
    endscreen;
    level_end_x = 2000;

    constructor(enemies, clouds, coins, backgroundObject, endscreen) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObject = backgroundObject;
        this.endscreen = endscreen;
    }
}