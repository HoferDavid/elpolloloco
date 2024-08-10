class Character extends MovableObject {

    y = 90;
    height = 260;
    width = 120;
    speed = 10; // 10
    world;
    runningSound = new Audio('audio/running.mp3');
    offset = {
        x: 20,
        y: 100,
        h: -110,
        w: -40
    };

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    constructor() {
        super().loadImg('img/2_character_pepe/1_idle/idle/I-1.png');
        this.currentState = null;
        this.animationInterval = null;
        this.idleTime = 0;
        this.idleTimeout = 3000; 

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
            this.updateAnimation(); // Animation sofort aktualisieren, wenn sich der Zustand ändert
        }
    }

    resetIdleTimer() {
        this.idleTime = 0; // Timer zurücksetzen
    }

    animate() {
        setInterval(() => {
            let hasMoved = false;

            // Bewegungserkennung
            if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
                this.moveRight();
                this.mirrorObject = false;
                this.setState('walking');
                hasMoved = true;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.mirrorObject = true;
                this.setState('walking');
                hasMoved = true;
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.setState('jumping');
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
            clearInterval(this.animationInterval); // Beendet das vorherige Animations-Intervall
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
                }, 40);
                break;
            case 'jumping':
                this.animateObject(this.IMAGES_JUMPING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_JUMPING);
                }, 200);
                break;
            case 'walking':
                this.animateObject(this.IMAGES_WALKING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_WALKING);
                }, 40);
                break;
            case 'sleeping':
                this.animateObject(this.IMAGES_SLEEPING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_SLEEPING);
                }, 500); // Langsameres Intervall für "Sleeping"
                break;
            default:
                this.animateObject(this.IMAGES_STANDING);
                this.animationInterval = setInterval(() => {
                    this.animateObject(this.IMAGES_STANDING);
                }, 400);
                break;
        }
    }
}



    // animate() {

    //     setInterval(() => {
    //         this.runningSound.pause();

    //         if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
    //             this.moveRight();
    //             this.mirrorObject = false;
    //             // this.runningSound.play();
    //         }

    //         if (this.world.keyboard.LEFT && this.x > 0) {
    //             this.moveLeft();
    //             this.mirrorObject = true;
    //             // this.runningSound.play();
    //         }      

    //         if (this.world.keyboard.SPACE && !this.isAboveGround()) {
    //             this.jump();
    //         }

    //         this.world.cameraX = -this.x + 100;
    //     }, 1000 / 60);


    //     setInterval(() => {
    //         if (this.isDead()) {
    //             this.animateObject(this.IMAGES_DEAD);
    //         } else if (this.isHurt()) {
    //             this.animateObject(this.IMAGES_HURT);
    //         } else if (this.isAboveGround()) {
    //             this.animateObject(this.IMAGES_JUMPING);
    //         } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
    //                 this.animateObject(this.IMAGES_WALKING);
    //         } else {
    //             this.animateObject(this.IMAGES_STANDING);
    //         }

    //     }, 40); // 40
    // };


