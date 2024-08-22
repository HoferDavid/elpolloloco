class ThrowableObject extends MovableObject {
    height = 72;
    width = 56;
    speedY = 20;
    // chickenIsBroken = false;
    

    IMAGES = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    constructor(x, y) {
        super().loadImg(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.throwObject();
        this.applyGravity();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.checkGroundCollision();
        }, 20);

        setInterval(() => {
            this.animateObject(this.IMAGES);
        }, 100);

        setInterval(() => {
            this.throwObjectCollisionEndboss();
        }, 160);

        setInterval(() => {
            this.throwObjectCollisionEnemy();
        }, 200);
    };


    throwObject() {
        if (world.character.direction == 'left') {
            this.x -= 40;
            this.throwObjectLeft();
        } else {
            this.throwObjectRight();
        }
    }


    throwObjectRight() {
        setInterval(() => {
            this.x += 16;
        }, 25);
    }


    throwObjectLeft() {
        setInterval(() => {
            this.x -= 16;
        }, 25);
    }


    checkGroundCollision() {
        if (this.y > 300 && !this.isBroken) {
            world.audio.bottleBroken.play();
            this.splashAnimation();
            this.isBroken = true;
        }
    }


    splashAnimation() {
        setInterval(() => {
            this.animateObject(this.IMAGES_SPLASH);
        }, 20);
    }


    throwObjectCollisionEnemy() {
        for (let i = 0; i < world.throwableObjects.length; i++) {
          let bottle = world.throwableObjects[i];

          for (let j = 0; j < world.level.enemies.length; j++) {
            let enemy = world.level.enemies[j];

            if (bottle.isColliding(enemy) && !bottle.chickenIsBroken) {

            bottle.chickenIsBroken = true;
                
              world.audio.bottleBroken.play();
              world.audio.chickenDeadSound.play();
              setTimeout(() => {
                bottle.splashAnimation();
              }, 500);
    
              enemy.isDead();

              setTimeout(() => {
                world.level.enemies.splice(j, 1);
              }, 100);
            }
          }
        }
    }


    throwObjectCollisionEndboss() {
        for (let i = 0; i < world.throwableObjects.length; i++) {
            let bottle = world.throwableObjects[i];
    
            for (let j = 0; j < world.level.endboss.length; j++) {
                let endboss = world.level.endboss[j];
    
                if (bottle.isColliding(endboss) && !bottle.isBroken) {
                  
                    bottle.isBroken = true;
    
                  world.audio.bottleBroken.play();
    
                  world.audio.endbossHitSound.play();
    
                    bottle.splashAnimation();
                    endboss.endbossHit();
                    setTimeout(() => {
                        world.throwableObjects.splice(i, 1);   
                    }, 100);
    
                    world.setPercentage(world.statusbarEndboss, endboss.energy);
                }
            }
        }
    }

}
