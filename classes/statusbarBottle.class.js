class StatusbarBottle extends MovableObject {
  x = 16;
  y = 60;
  height = 40;
  width = 120;

  IMAGES = [
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "./assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  
  constructor() {
    super().loadImg(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
  }


  /**
   * Resolves and returns the index of an image based on the current percentage.
   * The returned index is used to determine which image to display according to
   * the object's percentage value.
   *
   * - Returns 5 if the percentage is exactly 10.
   * - Returns 4 if the percentage is between 8 and 9 (inclusive).
   * - Returns 3 if the percentage is between 6 and 7 (inclusive).
   * - Returns 2 if the percentage is between 4 and 5 (inclusive).
   * - Returns 1 if the percentage is between 1 and 3 (inclusive).
   * - Returns 0 if the percentage is 0 or less.
   *
   * @returns {number} - The index of the image to be displayed, based on the percentage.
   */
  resolveImageIndex() {
    if (this.percentage == 10) {
      return 5;
    } else if (this.percentage >= 8) {
      return 4;
    } else if (this.percentage >= 6) {
      return 3;
    } else if (this.percentage >= 4) {
      return 2;
    } else if (this.percentage >= 1) {
      return 1;
    } else {
      return 0;
    }
  }
}
