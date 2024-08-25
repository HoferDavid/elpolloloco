class Cloud extends MovableObject {
  y = 10 + Math.random() * 80;
  width = 500;
  height = 260;
  speed = 0.1 + Math.random() * 0.2;

  
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
