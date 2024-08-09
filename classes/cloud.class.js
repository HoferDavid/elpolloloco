class Cloud extends MovableObject {

    y = 50;
    width = 500;
    height = 260;


    constructor(imgPath, x) {

        super().loadImg(imgPath);

        this.speed = 0.1 + Math.random() * 0.20;

        console.log(this.speed);
        
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}

