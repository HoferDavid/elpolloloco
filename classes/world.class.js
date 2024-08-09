class World {
    character = new Character();
    canvas;
    keyboard;
    ctx;
    cameraX = 0;
    level = level1;
    statusbar = new Statusbar();


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy);
                }
            });
        }, 200);
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.cameraX, 0);
        // Insert Fixed Objects here
        this.addToMap(this.statusbar);
        this.ctx.translate(this.cameraX, 0);

        this.addToMap(this.character);

        this.ctx.translate(-this.cameraX, 0);

        let self = this;
        requestAnimationFrame(function() { self.draw() });
    }


    addObjectsToMap(objects) { objects.forEach(o => { this.addToMap(o) }) };


    addToMap(mo) {
        if (mo.mirrorObject) {
            this.mirrorImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.mirrorObject) {
            this.mirrorImageBack(mo);
        }
    };


    mirrorImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    mirrorImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }
}