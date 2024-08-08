class Coin extends MovableObject {

    y = 120;
    height = 120;
    width = 120;
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 100 + Math.random() * 50;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES_WALKING);
        }, 320);
    };

}