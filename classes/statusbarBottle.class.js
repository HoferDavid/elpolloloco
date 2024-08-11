class StatusbarBottle extends MovableObject {

    x = 400; 
    y = 20;
    height = 40;
    width = 160;

    percentage = 0;

    IMAGES = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]


    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[path];
        
    }


    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage < 20) {
            return 1;
        } else if (this.percentage < 40) {
            return 2;
        } else if (this.percentage < 60) {
            return 3;
        } else if (this.percentage < 80) {
            return 4;
        } else {
            return 5;
        }
    }
}