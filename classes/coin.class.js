class Coin extends MovableObject {
  y = 40 + Math.random() * 200;
  x = 300 + Math.random() * 2000;
  height = 120;
  width = 120;
  offset = {
    x: 40,
    y: 40,
    h: -80,
    w: -80,
  };

  IMAGES = ["./assets/img/8_coin/coin_1.png", "./assets/img/8_coin/coin_2.png"];


  constructor() {
    super().loadImg("./assets/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES);
    this.animate();
  }

  
  /**
   * The `animate` method sets up an interval that repeatedly calls `animateObject`
   * with the object's image array (`IMAGES`). The interval is set to 320 milliseconds,
   * meaning that the animation will progress to the next image in the sequence every
   * 320 milliseconds.
   *
   * @method
   */
  animate() {
    setInterval(() => {
      this.animateObject(this.IMAGES);
    }, 320);
  }
}
