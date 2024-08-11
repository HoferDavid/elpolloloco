class Chick extends MovableObject {
    
    y = 380;
    height = 56;
    width = 40;
    IMAGES_ANIMATION = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImg('../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = 600 + Math.random() * 500;

        this.speed = 0.2 + Math.random() * 0.3;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.animateObject(this.IMAGES_ANIMATION);
        }, 160);
    };
}