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
    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);

        this.x = 600 + Math.random() * 2000; // 600 + Math.random() * 2000;
        this.y = 40 + Math.random() * 200;
        
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES);
        }, 320);
    };
}