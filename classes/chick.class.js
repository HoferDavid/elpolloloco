class Chick extends MovableObject {
  y = 380;
  x = 600 + Math.random() * 4000;
  height = 56;
  width = 40;
  speed = 0.2 + Math.random() * 0.5;

  IMAGES = [
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png",
  ];


  constructor() {
    super().loadImg(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
    this.applyGravity();
  }


  /**
   * Starts multiple animation loops for the chicks.
   *
   * - Moves the enemy to the left at approximately 60 frames per second (fps).
   * - Makes the enemy jump at random intervals between 1 to 4 seconds.
   * - Animates the enemy's sprite at a rate of 160 milliseconds per frame.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      this.enemyJump();
    }, 1000 + Math.random() * 3000);

    setInterval(() => {
      this.animateObject(this.IMAGES);
    }, 160);
  }


  /**
   * Updates the enemy's state to the dead state by loading the dead image.
   */
  isDead() {
    this.loadImg(this.IMAGES_DEAD);
  }


  /**
   * Makes the enemy jump by setting a random vertical speed.
   * 
   * The vertical speed is randomly determined between 1 and 40.
   */
  enemyJump() {
    this.speedY = 1 + Math.random() * 40;
  }
}
