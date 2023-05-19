class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 40;
        // this.otherDirection = otherDirection;
        // this.checkDirectionToThrow();
        this.throwForward();
    }

    // checkDirectionToThrow() {
    //     if(this.otherDirection == false) {
    //         throwForward(); 
    //         return
    //     } else if(this.otherDirection == true) {
    //         throwBackward();
    //     } 
    // }

    throwForward() {
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
    }

    // throwBackward() {
    //     this.speedY = 30;
    //     this.applyGravity();
    //     setInterval( () => {
    //         this.x -= 10;
    //     }, 25);
    // }
}