class Cloud extends MovableObject {
    y = 50;
    width = 500;
    height = 260;


    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }


}

