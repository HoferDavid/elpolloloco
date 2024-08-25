class Chicken extends MovableObject {
  y = 360;
  x = 600 + Math.random() * 3000;
  height = 72;
  width = 56;
  speed = 0.15 + Math.random() * 0.25;

  IMAGES = [
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png",
  ];


  /**
   * Constructs a new instance of the object, initializing it with the first image in the `IMAGES` array,
   * preloading all images, including images for the "dead" state, and starting the animation.
   * 
   * The constructor performs the following actions:
   * - Loads the initial image from the `IMAGES` array.
   * - Preloads all images in the `IMAGES` array and the `IMAGES_DEAD` array.
   * - Starts the object's animation.
   */
  constructor() {
    super().loadImg(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }


  /**
   * Starts the animation loops for the enemy.
   * 
   * - Moves the enemy to the left at a rate of approximately 60 frames per second (fps).
   * - Animates the enemy's sprite at a rate of 160 milliseconds per frame.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

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
}
