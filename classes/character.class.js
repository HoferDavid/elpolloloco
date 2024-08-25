class Character extends MovableObject {
  y = 110;
  x = 200;
  height = 260;
  width = 120;
  speed = 10;
  world;
  idleTime = 0;
  idleTimeout = 3000;
  offset = {
    x: 30,
    y: 120,
    h: -130,
    w: -70,
  };
  characterImages = new CharacterImages();
  direction = "right";


  /**
   * Constructs a new instance of the character object, initializing it with default images, 
   * preloading various image sets, applying gravity, and starting the animation.
   * 
   * The constructor performs the following actions:
   * - Loads the initial standing image.
   * - Preloads images for different character states (standing, sleeping, walking, jumping, hurt, dead).
   * - Applies gravity to the character.
   * - Starts the character's animation.
   */
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


  /**
   * Starts the main animation loop, which updates the object's movement, state, and camera position.
   * 
   * Runs at approximately 60 frames per second (fps).
   */
  animate() {
    setInterval(() => {
      this.hasMoved = false;
      if (this.canMoveRight()) { this.moveRight() }
      if (this.canMoveLeft()) { this.moveLeft() }
      if (this.canJump()) { this.jump() }
      if (this.world.keyboard.D) { this.hasMoved = true }
      this.setSleepingSettings();
      this.setOtherStates();
      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);
  }


  /**
   * Updates the character's animation based on its current state.
   * 
   * Clears any previous animation intervals before starting a new animation.
   */
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


  /**
   * Sets a new state for the character and triggers an update of the animation.
   * 
   * @param {string} newState - The new state to set for the character.
   */
  setState(newState) {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.updateAnimation();
    }
  }


  /**
   * Resets the idle timer to 0, typically used when the character performs an action.
   */
  resetIdleTimer() {
    this.idleTime = 0;
  }


  /**
   * Checks if the character can move to the right.
   * 
   * @returns {boolean} True if the character can move right, false otherwise.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
  }


  /**
   * Moves the character to the right, updates the state, and sets the direction.
   */
  moveRight() {
    super.moveRight();
    this.mirrorObject = false;
    if (!this.isAboveGround()) { this.setState("walking") }
    this.hasMoved = true;
    this.direction = "right";
  }


  /**
   * Checks if the character can move to the left.
   * 
   * @returns {boolean} True if the character can move left, false otherwise.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }


  /**
   * Moves the character to the left, updates the state, and sets the direction.
   */
  moveLeft() {
    super.moveLeft();
    this.mirrorObject = true;
    if (!this.isAboveGround()) { this.setState("walking") }
    this.hasMoved = true;
    this.direction = "left";
  }


  /**
   * Checks if the character can jump.
   * 
   * @returns {boolean} True if the character can jump, false otherwise.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }


  /**
   * Makes the character jump, updates the state, and sets the hasMoved flag.
   */
  jump() {
    this.speedY = 30;
    this.setState("jumping");
    this.hasMoved = true;
  }


  /**
   * Makes the character jump on an enemy, reducing the jump height.
   */
  jumpOnEnemy() {
    this.speedY = 20;
  }


  /**
   * Updates the idle time and sets the character to the sleeping state if idle for too long.
   */
  setSleepingSettings() {
    if (this.hasMoved) { this.resetIdleTimer() } 
    else { this.idleTime += 1000 / 60 }
    if (this.idleTime >= this.idleTimeout) { this.setState("sleeping") }
  }


  /**
   * Updates the character's state based on various conditions, such as being hurt or jumping.
   */
  setOtherStates() {
    if (this.isHurt()) { this.setState("hurt") } 
    else if (this.isAboveGround()) { this.setState("jumping") } 
    else if (!this.hasMoved && this.idleTime < this.idleTimeout) { this.setState("standing") }
  }


  /**
   * Collects a coin, plays the coin pickup sound, and increments the coin count.
   */
  collectCoin() {
    this.world.audio.coinPickupSound.play();
    this.coins++;
  }


  /**
   * Collects a bottle, plays the bottle pickup sound, and increments the bottle count.
   */
  collectBottle() {
    this.world.audio.bottlePickupSound.play();
    this.bottles++;
  }


  /**
   * Plays the hurt animation and sound in a loop.
   */
  hurtAnimation() {
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_HURT);
      this.world.audio.hurtSound.play();
    }, 40);
  }


  /**
   * Plays the jumping animation and sound in a loop.
   */
  jumpingAnimation() {
    if (this.world.audio.jumpSound.paused && this.world.keyboard.SPACE) { this.world.audio.jumpSound.play() }
    this.world.audio.snoringSound.pause();
    this.animationInterval = setInterval(() => { this.animateObject(this.characterImages.IMAGES_JUMPING) }, 80);
  }


  /**
   * Plays the walking animation and sound in a loop.
   */
  walkingAnimation() {
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_WALKING);
      this.world.audio.runningSound.play();
      this.world.audio.snoringSound.pause();
    }, 40);
  }


  /**
   * Plays the sleeping animation and sound in a loop.
   */
  sleepingAnimation() {
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_SLEEPING);
      this.world.audio.snoringSound.play();
    }, 500);
  }


  /**
   * Plays the default standing animation in a loop.
   */
  defaultAnimation() {
    this.animateObject(this.characterImages.IMAGES_STANDING);
    this.animationInterval = setInterval(() => {
      this.animateObject(this.characterImages.IMAGES_STANDING);
    }, 400);
  }


  /**
   * Plays the death animation, and after 1 second, triggers the game end function.
   */
  isDead() {
    setInterval(() => { this.animateObject(this.characterImages.IMAGES_DEAD) }, 300);
    setTimeout(() => { gameEnd("loseScreen") }, 1000);
  }
}
