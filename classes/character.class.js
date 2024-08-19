class Character extends MovableObject {
  y = 110;
  height = 260;
  width = 120;
  speed = 10; // 10
  world;
  idleTime = 0;
  idleTimeout = 5000;
  offset = {
    x: 30,
    y: 120,
    h: -130,
    w: -70,
  };
  characterImages = new CharacterImages();
  direction = 'right';

  constructor() {
    super().loadImg(this.characterImages.IMAGES_STANDING[0]);
    this.loadImages(this.characterImages.IMAGES_STANDING);
    this.loadImages(this.characterImages.IMAGES_SLEEPING);
    this.loadImages(this.characterImages.IMAGES_WALKING);
    this.loadImages(this.characterImages.IMAGES_JUMPING);
    this.loadImages(this.characterImages.IMAGES_HURT);
    this.loadImages(this.characterImages.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.hasMoved = false;
      if (this.canMoveRight()) {
        this.moveRight();
      }
      if (this.canMoveLeft()) {
        this.moveLeft();
      }
      if (this.canJump()) {
        this.jump();
      }
      if (this.world.keyboard.D) {
        this.hasMoved = true;
      }
      this.setSleepingSettings();
      this.setOtherStates();
      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);
  }

  updateAnimation() {
    if (this.animationInterval) clearInterval(this.animationInterval);
    const animations = {
      dead: () => this.deadAnimation(),
      hurt: () => this.hurtAnimation(),
      jumping: () => this.jumpingAnimation(),
      walking: () => this.walkingAnimation(),
      sleeping: () => this.sleepingAnimation(),
      default: () => this.defaultAnimation(),
    };
    (animations[this.currentState] || animations.default)();
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

  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }

  moveRight() {
    super.moveRight();
    this.mirrorObject = false;
    if (!this.isAboveGround()) {
      this.setState("walking");
    }
    this.hasMoved = true;
    this.direction = 'right';
  }

  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  moveLeft() {
    super.moveLeft();
    this.mirrorObject = true;
    if (!this.isAboveGround()) {
      this.setState("walking");
    }
    this.hasMoved = true;
    this.direction = 'left';
  }

  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  jump() {
    this.speedY = 30;
    this.setState("jumping");
    this.hasMoved = true;
  }

  jumpOnEnemy() {
    this.speedY = 20;
  }

  setSleepingSettings() {
    if (this.hasMoved) {
      this.resetIdleTimer();
    } else {
      this.idleTime += 1000 / 60;
    }
    if (this.idleTime >= this.idleTimeout) this.setState("sleeping");
  }

  setOtherStates() {
    if (this.isDead()) {
      this.setState("dead");
    } else if (this.isHurt()) {
      this.setState("hurt");
    } else if (this.isAboveGround()) {
      this.setState("jumping");
    } else if (!this.hasMoved && this.idleTime < this.idleTimeout) {
      this.setState("standing");
    }
  }

  collectCoin() {
    this.world.audio.coinPickupSound.play();
    this.coins++;
  }

  collectBottle() {
    this.world.audio.bottlePickupSound.play();
    this.bottles++;
  }

  deadAnimation() {
    this.animateObject(this.characterImages.IMAGES_DEAD);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_DEAD);
    }, 100);
  }

  hurtAnimation() {
    this.animateObject(this.characterImages.IMAGES_HURT);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_HURT);
      this.world.audio.hurtSound.play();
    }, 40);
  }

  jumpingAnimation() {
    this.animateObject(this.characterImages.IMAGES_JUMPING);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_JUMPING);
      this.world.audio.jumpSound.play();
      this.world.audio.snoringSound.pause();
    }, 80);
  }

  walkingAnimation() {
    this.animateObject(this.characterImages.IMAGES_WALKING);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_WALKING);
      this.world.audio.runningSound.play();
      this.world.audio.snoringSound.pause();
    }, 40);
  }

  sleepingAnimation() {
    this.animateObject(this.characterImages.IMAGES_SLEEPING);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_SLEEPING);
      this.world.audio.snoringSound.play();
    }, 500);
  }

  defaultAnimation() {
    this.animateObject(this.characterImages.IMAGES_STANDING);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_STANDING);
    }, 400);
  }
}
