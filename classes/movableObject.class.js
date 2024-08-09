class MovableObject extends DrawableObject {
    speed = 0.16;
    mirrorObject = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    offsetY = 0;
    lastHit = 0;


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;        
    }

    
    animateObject(images) {
        let i = this.currentImage % images.length;
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
        // this.setPercentage(this.energy);
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        return this.energy == 0;
    }
}
