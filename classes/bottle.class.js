class Bottle extends MovableObject {
  x = 600 + Math.random() * 2000;
  y = 350 + Math.random() * 20;
  height = 72;
  width = 56;
  offset = {
    x: 20,
    y: 10,
    h: -20,
    w: -30,
  };


  IMAGES = [
    "./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];


  /**
   * Constructs a new instance of the object, sets a random image from the available images, 
   * and starts the animation.
   */
  constructor() {
    super();
    this.setRandomImage(this.IMAGES);
    this.animate();
  }

  
  /**
   * Starts the animation of the object by cycling through images at a set interval.
   * Changes to the next image every 500 milliseconds.
   */
  animate() {
    setInterval(() => {
      this.nextImage();
    }, 500);
  }
}
