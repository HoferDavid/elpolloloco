class Chicken extends MovableObject {

    y = 360;
    height = 72;
    width = 56;
    IMAGES_ANIMATION = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = 600 + Math.random() * 500;

        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            this.animateObject(this.IMAGES_ANIMATION);
        }, 160);
    };
}