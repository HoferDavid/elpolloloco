class Character extends MovableObject {

    y = 90;
    height = 260;
    width = 120;
    speed = 10; // 10
    world;
    bottles = 0;
    coins = 0;
    runningSound = new Audio('./assets/audio/running.mp3');
    coinPickupSound = new Audio('./assets/audio/coinPickup.mp3');
    bottlePickupSound = new Audio('./assets/audio/bottlePickup.mp3');
    jumpSound = new Audio('./assets/audio/jump.mp3');
    snoringSound = new Audio('./assets/audio/snoring.mp3');
    hurtSound = new Audio('./assets/audio/hurt.mp3');
    offset = {
        x: 30,
        y: 120,
        h: -130,
        w: -70
    };

    IMAGES_STANDING = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-56.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];


    constructor() {
        super().loadImg(this.IMAGES_STANDING[0]);
        this.currentState = null;
        this.animationInterval = null;
        this.idleTime = 0;
        this.idleTimeout = 2000; 

        this.runningSound.volume = 0.4;
        this.runningSound.playbackRate = 1.8;
        this.coinPickupSound.volume = 0.4;
        this.bottlePickupSound.volume = 0.4;
        this.jumpSound.volume = 0.2;
        this.snoringSound.volume = 0.4;
        this.hurtSound.volume = 0.4;
        this.hurtSound.playbackRate = 2;

        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();      
        
        this.animate();
    }


    setState(newState) {
        if (this.currentState !== newState) {
            this.currentState = newState;
            this.updateAnimation();
        }
    }

    resetIdleTimer() {
        this.idleTime = 0;
    }

    animate() {
        setInterval(() => {
            this.runningSound.pause();
            let hasMoved = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.moveRight();
                this.mirrorObject = false;
                if (!this.isAboveGround()) {
                    this.setState('walking');
                }
                hasMoved = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.mirrorObject = true;
                if (!this.isAboveGround()) {
                    this.setState('walking');
                }
                hasMoved = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.setState('jumping');
                hasMoved = true;
            }

            if (this.world.keyboard.D) {
                hasMoved = true;
            }

            // Überprüfung auf Bewegung oder Untätigkeit
            if (hasMoved) {
                this.resetIdleTimer(); // Timer zurücksetzen bei Bewegung
            } else {
                this.idleTime += 1000 / 60; // Idle-Zeit erhöhen
            }

            // Einschlafen nach Timeout
            if (this.idleTime >= this.idleTimeout) {
                this.setState('sleeping');
            }

            // Zustandsverwaltung
            if (this.isDead()) {
                this.setState('dead');
            } else if (this.isHurt()) {
                this.setState('hurt');
            } else if (this.isAboveGround()) {
                this.setState('jumping');
            } else if (!hasMoved && this.idleTime < this.idleTimeout) {
                this.setState('standing');
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);
    }

    updateAnimation() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        switch (this.currentState) {
            case 'dead':
                this.animateObject(this.IMAGES_DEAD);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_DEAD);
                }, 100);
                break;
            case 'hurt':
                this.animateObject(this.IMAGES_HURT);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_HURT);
                    // this.hurtSound.play();
                }, 40);
                break;
            case 'jumping':
                this.animateObject(this.IMAGES_JUMPING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_JUMPING);
                    // this.jumpSound.play();
                    this.snoringSound.pause();
                }, 80);
                break;
            case 'walking':
                this.animateObject(this.IMAGES_WALKING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_WALKING);
                    // this.runningSound.play();
                    this.snoringSound.pause();
                }, 40);
                break;
            case 'sleeping':
                this.animateObject(this.IMAGES_SLEEPING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_SLEEPING);
                    // this.snoringSound.play();
                }, 500);
                break;
            default:
                this.animateObject(this.IMAGES_STANDING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_STANDING);
                }, 400);
                break;
        }
    }

    collectCoin() {
        // this.coinPickupSound.play();
        this.coins++;
    }


    collectBottle() {
        // this.bottlePickupSound.play();
        this.bottles++;
    }
}