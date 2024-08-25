class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;
  y = 480 - this.height;

  
  constructor(imgPath, x) {
    super().loadImg(imgPath);
    this.x = x;
  }
}
