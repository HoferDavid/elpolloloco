class Chick extends MovableObject {
    
    y = 380;
    height = 56;
    width = 40;
    
    IMAGES = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    constructor() {
        super().loadImg(this.IMAGES[0]);
        // super().loadImg('./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES);

        this.x = 600 + Math.random() * 500;

        this.speed = 0.2 + Math.random() * 0.3;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animateObject(this.IMAGES);
        }, 160);
    };
}