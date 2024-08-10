class ThrowableObject extends MovableObject {

    speedX = 30;
    speedY = 20;
    height = 72;
    width = 56;
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];


    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);

        this.throwObject(100, 150);

        this.x = x;
        this.y = y;

        this.animate();
    }


    throwObject() {
        this.applyGravity(); 

        setInterval(() => {
            this.x += 10;
        }, 25);
    }


    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES);
        }, 320);
    };
    
}