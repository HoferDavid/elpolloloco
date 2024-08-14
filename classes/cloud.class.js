class Cloud extends MovableObject {
    y = 10 + Math.random() * 80;
    width = 500;
    height = 260;
    speed = 0.1 + Math.random() * 0.20;


    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }


}

