class StatusbarHealth extends DrawableObject {
    x = 20;
    y = 16;
    height = 40;
    width = 120;
    percentage = 100;

    IMAGES = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]


    constructor() {
        super().loadImg(this.IMAGES[5]);
        this.loadImages(this.IMAGES);
    }

    
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            gameOver();
            return 0;
        }
    }
}