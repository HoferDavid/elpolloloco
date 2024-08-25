class StatusbarEndboss extends DrawableObject {
  x = 540;
  y = 0;
  height = 60;
  width = 160;
  percentage = 100;

  IMAGES = [
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "./assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
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
   * - Returns 1 if the percentage is between 20 and 39 (inclusive).
   * - Returns 0 if the percentage is less than 20.
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
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
