class Cloud extends MovableObject {
    y = 20;
    width = 600;
    height = 260;

    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
    }
}