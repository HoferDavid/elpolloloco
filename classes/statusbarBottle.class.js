class StatusbarBottle extends MovableObject {
    x = 300; 
    y = 16;
    height = 40;
    width = 120;

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]


    constructor() {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
    }


    resolveImageIndex() {
        if (this.percentage == 10) {
            return 5;
        } else if (this.percentage >= 8) {
            return 4;
        } else if (this.percentage >= 6) {
            return 3;
        } else if (this.percentage >= 4) {
            return 2;
        } else if (this.percentage >= 2) {
            return 1;
        } else {
            return 0;
        }
    }
}