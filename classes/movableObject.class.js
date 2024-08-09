class MovableObject {
    x = 120; 
    y = 280;
    img;
    height = 160;
    width = 100;
    imgCache = {};
    currentImage = 0;
    speed = 0.16;
    mirrorObject = false;
    speedY = 0;
    acceleration = 2.5;


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


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }

    
    animateObject(images) {
        let i = this.currentImage % this.IMAGES_ANIMATION.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }


    isAboveGround() {
        return this.y < 180;
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    jump() {
        this.speedY = 30;
    }
}