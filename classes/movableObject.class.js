class MovableObject {
    x = 120; 
    y = 280;
    img;
    height = 160;
    width = 100;
    imgCache = {};
    currentImage = 0;
    speed = 0.16;
    mirrorObject = false;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    moveRight() {
        console.log('moving right');   
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}