class ThrowableObject extends MovableObject {
    height = 72;
    width = 56;
    speedY = 20;

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
            this.animateObject(this.IMAGES);
        }, 100);

        this.splashInterval = setInterval(() => {
            this.checkGroundCollision();
        }, 20);
    };


    throwObject() {
        setInterval(() => {
            this.x += 16;
        }, 25);
    }


    checkGroundCollision() {
        if (this.y > 300) {
            // this.splashAnimation();
            clearInterval(this.splashInterval);
            setTimeout(() => {
                this.isRemoved = true;
            }, 1000);
        }
        console.log('ground collision');
        
    }


    splashAnimation() {
        let animationInterval = setInterval(() => {
            this.animateObject(this.IMAGES_SPLASH);
        }, 20);
    }
}
