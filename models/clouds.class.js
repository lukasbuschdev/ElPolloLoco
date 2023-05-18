class Clouds extends MovableObject {
    y = 50;
    width = 500;
    height = 300;


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 200 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}