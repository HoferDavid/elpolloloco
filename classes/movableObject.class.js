class MovableObject extends DrawableObject {
    speed = 0.16;
    mirrorObject = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    bottles = 0
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


    isColliding(obj) {
        // Berechnung der tatsächlichen Grenzen des aktuellen Objekts
        const thisLeft = this.x + this.offset.x;
        const thisRight = thisLeft + this.width + this.offset.w;
        const thisTop = this.y + this.offset.y;
        const thisBottom = thisTop + this.height + this.offset.h;
    
        // Berechnung der tatsächlichen Grenzen des anderen Objekts
        const objLeft = obj.x + obj.offset.x;
        const objRight = objLeft + obj.width;
        const objTop = obj.y;
        const objBottom = objTop + obj.height;
    
        // Kollisionserkennung unter Berücksichtigung der Offsets
        return thisRight >= objLeft &&
               thisLeft <= objRight &&
               thisBottom >= objTop &&
               thisTop <= objBottom;
    }


    hit() {
        this.energy -= 1; // 5
        // this.setPercentage(this.energy);
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    bottlePickup() {
        this.bottles += 5;
        if (this.bottles > 100) {
            this.bottles = 100;
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
