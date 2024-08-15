class Chick extends MovableObject {
    y = 380;
    x = 600 + Math.random() * 500;
    height = 56;
    width = 40;
    speed = 0.2 + Math.random() * 0.3;
    
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
        this.loadImages(this.IMAGES);
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (this.energy > 0) {
                this.animateObject(this.IMAGES);
            } else {
                console.log('dead');
            }
          }, 160);
    };


    isDead() {
        setInterval(() => {
            this.loadImg(this.IMAGES_DEAD);
        }, 1000 / 5);
    }
}