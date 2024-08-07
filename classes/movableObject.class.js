class MovableObject {
    x = 120; 
    y = 280;
    img;
    height = 160;
    width = 100;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('moving right');   
    }

    moveLeft() {
        
    }
}