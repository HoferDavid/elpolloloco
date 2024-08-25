class MovableObject extends DrawableObject {
  speed = 0.16;
  mirrorObject = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  dead = false;
  currentState = null;
  animationInterval = null;
  hasMoved = false;


  /**
   * Moves the object to the right by increasing its x-coordinate by the current speed.
   */
  moveRight() {
    this.x += this.speed;
  }


  /**
   * Moves the object to the left by decreasing its x-coordinate by the current speed.
   */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
   * Animates the object by cycling through the provided array of image paths.
   * 
   * The current image is updated based on the current frame index.
   * 
   * @param {string[]} images - An array of image paths used for animation.
   */
  animateObject(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImage++;
  }


  /**
   * Checks if the object is above the ground level.
   * 
   * Different conditions apply depending on the type of object.
   * 
   * @returns {boolean} - True if the object is above the ground, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) { return true }
    if (this instanceof Chick) { return this.y < 380 } 
    else { return this.y < 180 }
  }


  /**
   * Applies gravity to the object, causing it to fall if it is above ground.
   * 
   * The object's vertical position and speed are updated at regular intervals.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }


  /**
   * Checks if the object is colliding with another object.
   * 
   * The collision detection is based on the objects' positions and dimensions.
   *
   * @param {Object} obj - The object to check for collision.
   * @returns {boolean} - True if the objects are colliding, otherwise false.
   */
  isColliding(obj) {
    const thisLeft = this.x + this.offset.x;
    const thisRight = thisLeft + this.width + this.offset.w;
    const thisTop = this.y + this.offset.y;
    const thisBottom = thisTop + this.height + this.offset.h;
    const objLeft = obj.x + obj.offset.x;
    const objRight = objLeft + obj.width + obj.offset.w;
    const objTop = obj.y + obj.offset.y;
    const objBottom = objTop + obj.height + obj.offset.h;
    return (
      thisRight >= objLeft &&
      thisLeft <= objRight &&
      thisBottom >= objTop &&
      thisTop <= objBottom );
  }


  /**
   * Reduces the object's energy by the specified damage amount.
   * 
   * If energy drops below 0, it is set to 0. Updates the time of the last hit.
   *
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) { this.energy = 0 } 
    else { this.lastHit = new Date().getTime() }
  }


  /**
   * The object is considered hurt if less than 0.5 seconds have passed since the last hit.
   *
   * @returns {boolean} - True if the object is hurt, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  
  /**
   * Increases the object's bottle count by 5 when a bottle is picked up.
   */
  bottlePickup() {
    this.bottles += 5;
  }
}
