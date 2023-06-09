class Endboss extends MovableObject {

    width = 300;
    height = 450;
    y = 20;
    x = 2200;
    images_walking = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super().loadImage(this.images_walking[0]);
        this.loadImages(this.images_walking);
        this.x = 1000*2;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.images_walking);
        }, 200)
    }
}