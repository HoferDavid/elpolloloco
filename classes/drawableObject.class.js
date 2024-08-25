class DrawableObject {
  x = 120;
  y = 280;
  height = 160;
  width = 100;
  img;
  imgCache = {};
  currentImage = 0;
  currentImageIndex = 0;
  bottles = 0;
  coins = 0;
  direction;
  offset = {
    x: 0,
    y: 0,
    h: 0,
    w: 0,
  };

  
  /**
   * Loads an image from the specified path and assigns it to this object's `img` property.
   *
   * @param {string} path - The path to the image file to be loaded.
   */
  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Loads multiple images from an array of paths and caches them in the `imgCache` property.
   *
   * @param {string[]} arr - An array of image file paths to be loaded and cached.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.onload = () => {
        this.imgCache[path] = img;
      };
    });
  }


  /**
   * Sets a random image from the provided image array to the object and loads it.
   *
   * @param {string[]} imageArray - An array of image paths from which to select a random image.
   */
  setRandomImage(imageArray) {
    this.currentImageIndex = Math.floor(Math.random() * imageArray.length);
    this.loadImg(this.IMAGES[this.currentImageIndex]);
  }


  /**
   * Advances to the next image in the `IMAGES` array and loads it.
   * The method increments the `currentImageIndex` by one and loops back to the start if the end of the array is reached.
   */
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.IMAGES.length;
    this.loadImg(this.IMAGES[this.currentImageIndex]);
  }


  /**
   * Draws the current image on the provided canvas context.
   * 
   * The image is drawn only if it has been fully loaded. The image is positioned at the
   * object's `x` and `y` coordinates and is scaled to the object's `width` and `height`.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
   */
  draw(ctx) {
    if (this.img && this.img.complete) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
}
