class ThrowableObject extends MovableObject {
    height = 72;
    width = 56;
    speedY = 20;
    world;

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
        // this.throwObjects();
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.checkGroundCollision();
        }, 20);

        setInterval(() => {
            this.animateObject(this.IMAGES);
            // this.throwObjects();
        }, 100);
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


    // throwObjects() {
    //     if (this.world.keyboard.D && this.world.character.bottles > 0) {
    //         console.log('throw');
            
    //       let bottle = new ThrowableObject(
    //         this.world.character.x + 44,
    //         this.world.character.y + 100
    //       );
    //       this.world.throwableObjects.push(bottle);
    //       this.world.character.bottles--;
    //       this.world.setPercentage(this.world.statusbarBottle, this.world.character.bottles);
    //     }
    //   }
}
