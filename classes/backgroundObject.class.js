class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  y = 480 - this.height;

  
  /**
   * Constructs a new instance of the object, loading an image and setting its initial x-coordinate.
   *
   * @param {string} imgPath - The file path to the image that should be loaded for this object.
   * @param {number} x - The initial x-coordinate position of the object.
   */
  constructor(imgPath, x) {
    super().loadImg(imgPath);
    this.x = x;
  }
}
