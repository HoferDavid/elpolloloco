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
    energy = 100;
    offsetY = 0;


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
        if (this.drawFrameInstance()) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    drawFrameInstance() {
        const classes = [Character, Chicken, Chick, Coin];
        return classes.some(cls => this instanceof cls);
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


    isColliding(mo) {
        return (this.x + this.width) >= mo.x && this.x <= (mo.x + mo.width) && 
            (this.y + this.offsetY + this.height) >= mo.y &&
            (this.y + this.offsetY) <= (mo.y + mo.height);
            // mo.onCollisionCourse;
    }


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        }
    }


    isDead() {
        return this.energy == 0;
    }
}


// if (character.x + character.width > chicken.x &&
//     character.y + character.height > chicken.y &&
//     character.x < chicken.x &&
//     character.y < chicken.y + chicken.height
// )