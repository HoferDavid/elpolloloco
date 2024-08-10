class Coin extends MovableObject {

    y = 100;
    height = 120;
    width = 120;
    offset = {
        x: 40,
        y: 40,
        h: -80,
        w: -80
    };
    IMAGES_ANIMATION = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = 600 + Math.random() * 20; // 600 + Math.random() * 2000;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES_ANIMATION);
        }, 320);
    };
}