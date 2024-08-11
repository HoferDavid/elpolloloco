class Endboss extends MovableObject {

    height = 400;
    width = 240;
    y = 50;

    IMAGES_ANIMATION = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    
    constructor() {
        super().loadImg('./assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = 2500;
        this.animate();
    }


    animate() {
        this.moveLeft();

        setInterval(() => {
            this.animateObject(this.IMAGES_ANIMATION);
        }, 160);
    }

}