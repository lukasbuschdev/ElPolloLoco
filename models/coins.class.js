class Coins extends MovableObject {
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.width = 200;
        this.height = 200;
        this.drawCoins();
    }

    drawCoins() {
        this.x = 200 + Math.random() * 1500;
        this.y = 100 + Math.random() * 150;
    }
}