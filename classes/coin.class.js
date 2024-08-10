class Coin extends MovableObject {

    y = 100;
    height = 120;
    width = 120;
    IMAGES_ANIMATION = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        x: 40,
        y: 40,
        h: 40,
        w: 40
    };

    constructor() {
        super().loadImg('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_ANIMATION);

        this.x = 60 + Math.random() * 2000; // Change first num to 600
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.animateObject(this.IMAGES_ANIMATION);
        }, 320);
    };

    
    drawFrameHitbox(ctx) {
        if (this.drawFrameInstances()) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.x, this.y + this.offset.y, this.width - this.offset.x - this.offset.y, this.height - this.offset.x - this.offset.y);
            ctx.stroke();
        }
    }

}