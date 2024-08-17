class MovableObject extends DrawableObject {
    speed = 0.16;
    mirrorObject = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    dead = false;
    currentState = null;
    animationInterval = null;
    hasMoved = false;

    
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
        if (this instanceof ThrowableObject) {
            return true;
        }
        if (this instanceof Chick) {
            return this.y < 380;
        } else {
            return this.y < 180;
        }
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isColliding(obj) {
        const thisLeft = this.x + this.offset.x; // Berechnung der tatsächlichen Grenzen des aktuellen Objekts
        const thisRight = thisLeft + this.width + this.offset.w;
        const thisTop = this.y + this.offset.y;
        const thisBottom = thisTop + this.height + this.offset.h;
    
        const objLeft = obj.x + obj.offset.x; // Berechnung der tatsächlichen Grenzen des anderen Objekts
        const objRight = objLeft + obj.width + obj.offset.w;
        const objTop = obj.y + obj.offset.y;
        const objBottom = objTop + obj.height + obj.offset.h;

        return thisRight >= objLeft && // Kollisionserkennung unter Berücksichtigung der Offsets
               thisLeft <= objRight &&
               thisBottom >= objTop &&
               thisTop <= objBottom;
    }


    hit(damage) {
        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    // hitEnemy(i) {
    //     console.log(i);
    // }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }


    isDead() {
        // this.animateObject(this.IMAGES_DEAD);
    }


    bottlePickup() {
        this.bottles += 5;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }
}
