class ThrowableObject extends MovableObject {
  height = 72;
  width = 56;
  speedY = 20;

  IMAGES = [
    "./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];


  /**
   * Initializes a throwable object by loading images, setting the position, and initiating various behaviors such as throwing, gravity, and animation.
   *
   * @param {number} x - The initial x-coordinate for the object.
   * @param {number} y - The initial y-coordinate for the object.
   */
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


  /**
   * Handles the main animation loops, including ground collision checks,
   * object animations, and collision detection with enemies and the end boss.
   * Each interval is set to different timings to handle different aspects of the game.
   */
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
  }


  /**
   * Throws an object in the direction the character is facing.
   * If the character is facing left, the object is thrown to the left; otherwise, to the right.
   */
  throwObject() {
    if (world.character.direction == "left") {
      this.x -= 40;
      this.throwObjectLeft();
    } else {
      this.throwObjectRight();
    }
  }


  /**
   * Moves the thrown object to the right by incrementing its x-coordinate over time.
   */
  throwObjectRight() {
    setInterval(() => {
      this.x += 16;
    }, 25);
  }


  /**
   * Moves the thrown object to the left by decrementing its x-coordinate over time.
   */
  throwObjectLeft() {
    setInterval(() => {
      this.x -= 16;
    }, 25);
  }


  /**
   * Checks if the object has collided with the ground.
   * If so, it plays a sound effect and triggers the splash animation.
   */
  checkGroundCollision() {
    if (this.y > 300 && !this.isBroken) {
      world.audio.bottleBroken.play();
      this.splashAnimation();
      this.isBroken = true;
    }
  }


  /**
   * Triggers the splash animation for the object by cycling through splash images.
   */
  splashAnimation() {
    setInterval(() => {
      this.animateObject(this.IMAGES_SPLASH);
    }, 20);
  }


  /**
   * If a collision is detected, it triggers sound effects, animations, and removes the enemy from the level.
   */
  throwObjectCollisionEnemy() {
    for (let i = 0; i < world.throwableObjects.length; i++) {
      let bottle = world.throwableObjects[i];
      for (let j = 0; j < world.level.enemies.length; j++) {
        let enemy = world.level.enemies[j];
        if (bottle.isColliding(enemy) && !bottle.chickenIsBroken) {
          this.ifEnemyHit(bottle, enemy, j);
        }
      }
    }
  }


  /**
   * This method sets the bottle's `chickenIsBroken` property to true, plays sound effects,
   * triggers a splash animation after a short delay, marks the enemy as dead, and
   * removes the enemy from the level after a short delay.
   *
   * @param {Object} bottle - The bottle object that hit the enemy.
   * @param {Object} enemy - The enemy object that was hit.
   * @param {number} j - The index of the enemy in the world's enemies array.
   *
   * @returns {void}
   */
  ifEnemyHit(bottle, enemy, j) {
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


  /**
   * If a collision is detected, it triggers sound effects, animations, and updates the end boss's health.
   */
  throwObjectCollisionEndboss() {
    for (let i = 0; i < world.throwableObjects.length; i++) {
      let bottle = world.throwableObjects[i];
      for (let j = 0; j < world.level.endboss.length; j++) {
        let endboss = world.level.endboss[j];
        if (bottle.isColliding(endboss) && !bottle.isBroken) {
          this.ifEndbossHit(bottle, endboss, i);
        }
      }
    }
  }


  /**
   * This method sets the bottle's `isBroken` property to true, plays sound effects, triggers
   * a splash animation, and calls the `endbossHit` method on the endboss. It also removes
   * the bottle from the world's throwable objects array after a short delay and updates
   * the percentage of the endboss's energy in the status bar.
   *
   * @param {Object} bottle - The bottle object that hit the endboss.
   * @param {Object} endboss - The endboss object that was hit.
   * @param {number} i - The index of the bottle in the world's throwable objects array.
   *
   * @returns {void}
   */
  ifEndbossHit(bottle, endboss, i) {
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
