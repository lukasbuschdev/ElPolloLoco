class Bottle extends MovableObject {

    height = 65;
    width = 55;

    Image_Bottle = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    offset = {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10
    }

    constructor(x) {
        super().loadImage(this.Image_Bottle[this.bottlteOnGround()]);
        this.x = x + Math.random() * 65;
        this.y = 375;
    }

    bottlteOnGround() {
        let i  = Math.random();
        if(i < 0.8){
            i = 0;
        } else {
            i = 1;
        };
        return i;
    }
}