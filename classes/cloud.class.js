class Cloud extends MovableObject {
  y = 10 + Math.random() * 80;
  width = 500;
  height = 260;
  speed = 0.1 + Math.random() * 0.2;


  /**
   * Constructs a new instance of the object, initializing it with the specified image path and x-coordinate.
   * 
   * The constructor performs the following actions:
   * - Loads the image from the provided `imgPath`.
   * - Sets the x-coordinate of the object to the provided `x` value.
   * - Starts the object's animation.
   *
   * @param {string} imgPath - The file path of the image to load for the object.
   * @param {number} x - The x-coordinate position for the object.
   */
  constructor(imgPath, x) {
    super().loadImg(imgPath);
    this.x = x;
    this.animate();
  }


  /**
   * Starts the animation loop for the enemy.
   * 
   * Continuously moves the enemy to the left at a rate of approximately 60 frames per second (fps).
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
