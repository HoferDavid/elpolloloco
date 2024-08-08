class Cloud extends MovableObject {
    
    y = 50;
    width = 500;
    height = 260;


    constructor(imgPath, x) {
        // super().loadImg('img/5_background/layers/4_clouds/1.png');

        super().loadImg(imgPath);

        // this.x = Math.random() * 100;
        this.speed = 0.15 + Math.random() * 0.20;

        console.log(this.speed);
        

        this.x = x;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}

