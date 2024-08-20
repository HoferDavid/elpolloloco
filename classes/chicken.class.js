class Chicken extends MovableObject {
    y = 360;
    x = 600 + Math.random() * 3000;
    height = 72;
    width = 56;
    speed = 0.15 + Math.random() * 0.25;

    IMAGES = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        './assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor() {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_DEAD);
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


    isDead() {
        this.loadImg(this.IMAGES_DEAD);
    }
}



