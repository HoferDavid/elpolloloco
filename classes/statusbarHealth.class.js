class StatusbarHealth extends DrawableObject {
  x = 16;
  y = 0;
  height = 40;
  width = 120;
  percentage = 100;

  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "./assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  
  /**
   * The first image in the `IMAGES` array is loaded immediately using the `loadImg` method from the parent class,
   * followed by preloading all images in the `IMAGES` array using the `loadImages` method.
   */
  constructor() {
    super().loadImg(this.IMAGES[5]);
    this.loadImages(this.IMAGES);
  }


  /**
   * Resolves and returns the index of an image based on the current percentage.
   * The returned index is used to determine which image to display according to
   * the object's percentage value.
   *
   * - Returns 5 if the percentage is 100.
   * - Returns 4 if the percentage is between 80 and 99 (inclusive).
   * - Returns 3 if the percentage is between 60 and 79 (inclusive).
   * - Returns 2 if the percentage is between 40 and 59 (inclusive).
   * - Returns 1 if the percentage is between 1 and 39 (inclusive).
   * - Returns 0 if the percentage is 0 or less.
   *
   * @returns {number} - The index of the image to be displayed, based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
