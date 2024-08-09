class DrawableObject {
    x = 120; 
    y = 280;
    height = 160;
    width = 100;
    img;
    imgCache = {};
    currentImage = 0;


    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    drawFrame(ctx) {
        if (this.drawFrameInstances()) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameInstances() {
        const classes = [Character, Chicken, Chick, Coin];
        return classes.some(cls => this instanceof cls);
    }
}