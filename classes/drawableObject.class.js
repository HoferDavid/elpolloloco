class DrawableObject {
    x = 120; 
    y = 280;
    height = 160;
    width = 100;
    img;
    imgCache = {};
    currentImage = 0;
    offset = {
        x: 0,
        y: 0,
        h: 0,
        w: 0
    };


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
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameHitbox(ctx) {
        const thisLeft = this.x + this.offset.x;
        const thisTop = this.y + this.offset.y;
        const hitboxWidth = this.width + this.offset.w;
        const hitboxHeight = this.height + this.offset.h;
    
        if (this.drawFrameInstances()) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(thisLeft, thisTop, hitboxWidth, hitboxHeight);
            ctx.stroke();
        }
    }


    drawFrameInstances() {
        const classes = [Character, Endboss, Chicken, Chick, Coin, Bottle];
        return classes.some(cls => this instanceof cls);
    }
}