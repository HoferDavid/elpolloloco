class World {
  character = new Character();
  audio = new GameAudio();
  canvas;
  keyboard;
  ctx;
  cameraX = 0;
  level = level1;
  statusbarHealth = new StatusbarHealth();
  statusbarCoin = new StatusbarCoin();
  statusbarBottle = new StatusbarBottle();
  statusbarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  percentage = 0;
  damage = 0;
  dead = false;

  constructor(canvas, keyboard, endboss) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = endboss;
    this.draw();
    this.setWorld();
    this.checkInterval();
    this.throwableObjects = [];
  }


  /**
   * Sets the world context for the character. This method assigns the current instance of the world to the character's `world` property.
   */
  setWorld() {
    this.character.world = this;
  }


  /**
   * This method clears the canvas, applies camera translation, draws the objects, 
   * and schedules the next frame using `requestAnimationFrame`.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawObjects();
    this.drawFixedObjects();
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }


  /**
   * This method adds background objects, bottles, clouds, coins, enemies, endboss, 
   * and throwable objects to the map.
   */
  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
  }


  /**
   * This method draws status bars and other fixed objects that do not move with the camera.
   */
  drawFixedObjects() {
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarEndboss);
    this.ctx.translate(this.cameraX, 0);
  }


  /**
   * This method iterates over an array of objects and calls the `addToMap` method for each one.
   *
   * @param {Array<Object>} objects - The array of objects to add to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }


  /** 
   * This method handles mirroring of the object if needed and draws it on the canvas.
   *
   * @param {Object} mo - The object to add to the map.
   */
  addToMap(mo) {
    if (mo.mirrorObject) this.mirrorImage(mo);
    mo.draw(this.ctx);
    if (mo.mirrorObject) this.mirrorImageBack(mo);
  }


  /**
   * This method applies a horizontal mirroring transformation to the canvas context.
   *
   * @param {Object} mo - The object to mirror.
   */
  mirrorImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }


  /**
   * This method reverts the canvas context to its state before mirroring.
   *
   * @param {Object} mo - The object to restore.
   */
  mirrorImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }


  /**
   * This method sets up intervals to check for collisions with enemies, the endboss,
   * coin pickups, bottle pickups, and to handle throwing objects.
   */
  checkInterval() {
    setInterval(() => {
      this.checkCollisionsWithEnemies();
      this.checkCollisionsWithEndboss();
      this.checkCoinPickup();
      this.checkBottlePickup();
    }, 20);
    setInterval(() => {
      this.throwObjects();
    }, 200);
  }


  /**
   * This method handles jumping on enemies and colliding with enemies, updating the character's state accordingly.
   */
  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.isJumpingOnEnemy(enemy)) {
        this.jumpingOnEnemy(enemy, i);
      } else if (this.isCollidingWithEnemy(enemy)) {
        if (this.character.currentState === "sleeping") { this.character.isDead() } 
        else { this.collidingWithEnemy(enemy) }
      }
    });
  }


  /**
   * Checks if the character is colliding with the enemy, is above the ground,
   * and has a non-positive vertical speed.
   *
   * @param {Object} enemy - The enemy object to check.
   * @returns {boolean} - True if the character is jumping on the enemy, otherwise false.
   */
  isJumpingOnEnemy(enemy) {
    return (
      this.character.isColliding(enemy) &&
      this.character.isAboveGround() &&
      this.character.speedY <= 0
    );
  }


  /**
   * This method makes the character jump on the enemy, plays a sound, marks the enemy as dead,
   * and removes it from the level after a short delay.
   *
   * @param {Object} enemy - The enemy object that was jumped on.
   * @param {number} i - The index of the enemy in the level's enemies array.
   */
  jumpingOnEnemy(enemy, i) {
    this.character.jumpOnEnemy();
    this.audio.chickenDeadSound.play();
    enemy.isDead();
    enemy.dead = true;
    setTimeout(() => {
      this.level.enemies.splice(i, 1);
    }, 50);
  }


  /**
   * This method checks if the character is colliding with the enemy and has a downward speed.
   *
   * @param {Object} enemy - The enemy object to check.
   * @returns {boolean} - True if the character is colliding with the enemy, otherwise false.
   */
  isCollidingWithEnemy(enemy) {
    return this.character.isColliding(enemy) && this.character.speedY < 0;
  }


  /**
   * This method updates the character's health based on the type of enemy and applies damage.
   *
   * @param {Object} enemy - The enemy object that was collided with.
   */
  collidingWithEnemy(enemy) {
    if (enemy instanceof Chicken) { this.damage = 2 } 
    else { this.damage = 1 }
    this.updateCharacterHealth(this.damage);
  }


  /**
   * This method applies damage to the character if a collision with the endboss is detected.
   */
  checkCollisionsWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.damage = 4;
        this.updateCharacterHealth(this.damage);
      }
    });
  }


  /**
   * This method adjusts the character's health, updates the health status bar, 
   * and checks if the character is dead.
   *
   * @param {number} damage - The amount of damage taken by the character.
   */
  updateCharacterHealth(damage) {
    this.character.hit(damage);
    this.character.hasMoved = true;
    this.setPercentage(this.statusbarHealth, this.character.energy);
    if (this.character.energy == 0) {
      this.character.isDead();
    }
  }


  /**
   * This method updates the percentage property of a status bar and refreshes its image based on the current value.
   *
   * @param {Object} statusbar - The status bar to update.
   * @param {number} percentage - The new percentage value for the status bar.
   */
  setPercentage(statusbar, percentage) {
    statusbar.percentage = percentage;
    let path = statusbar.IMAGES[statusbar.resolveImageIndex()];
    statusbar.img = statusbar.imgCache[path];
  }


  /**
   * This method detects if the character collides with any coins, collects them, 
   * and updates the coin status bar.
   */
  checkCoinPickup() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.level.coins.splice(i, 1);
        this.setPercentage(this.statusbarCoin, this.character.coins);
      }
    });
  }


  /**
   * This method detects if the character collides with any bottles, collects them, 
   * and updates the bottle status bar.
   */
  checkBottlePickup() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.level.bottles.splice(i, 1);
        this.setPercentage(this.statusbarBottle, this.character.bottles);
      }
    });
  }


  /**
   * This method creates a new throwable object if the throw key is pressed and updates
   * the number of bottles available for the character.
 */
  throwObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 44,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.setPercentage(this.statusbarBottle, this.character.bottles);
    }
  }
}
