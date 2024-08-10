class MovableObject extends DrawableObject {
    speed = 0.16;
    mirrorObject = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    offset = {
        x: 0,
        y: 0,
        h: 0,
        w: 0
    };


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
        const objLeft = obj.x;
        const objRight = objLeft + obj.width;
        const objTop = obj.y;
        const objBottom = objTop + obj.height;
    
        // Kollisionserkennung unter Berücksichtigung der Offsets
        return thisRight >= objLeft &&
               thisLeft <= objRight &&
               thisBottom >= objTop &&
               thisTop <= objBottom;
    }



    // isColliding(mo) {
    //     return this.x + this.width - this.offsetRight > mo.x + this.offsetLeft &&
    //     this.y + this.height - this.offsetBottom > mo.y + this.offsetTop &&
    //     this.x + this.offsetLeft < mo.x + mo.width - this.offsetRight &&
    //     this.y + this.offsetTop < mo.y + mo.height - this.offsetBottom;
    // }


    // isColliding(mo) {
    //     return (this.x + this.width) >= mo.x && 
    //         this.x <= (mo.x + mo.width) && 
    //         (this.y + this.offsetY + this.height) >= mo.y &&
    //         (this.y + this.offsetY) <= (mo.y + mo.height);
    //         // mo.onCollisionCourse;
    // }


    hit() {
        this.energy -= 1;
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



// isColliding(mo) {
//     return (this.x + this.width) >= mo.x && 
//         this.x <= (mo.x + mo.width) && 
//         (this.y + this.offsetY + this.height) >= mo.y &&
//         (this.y + this.offsetY) <= (mo.y + mo.height);
//         // mo.onCollisionCourse;
// }