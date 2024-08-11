class Bottle extends MovableObject {

    y = 360;
    height = 72;
    width = 56;
    offset = {
        x: 20,
        y: 10,
        h: -20,
        w: -30
    };
    IMAGES = [
        './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];


    constructor() {
        super().loadImg('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES);

        this.x = 200 + Math.random() * 1000;
        this.animate();
    }

    
    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES);
        }, 500);
    };
}