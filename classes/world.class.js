class World {
    character = new Character();
    canvas;
    keyboard;
    ctx;
    cameraX = 0;
    level = level1;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    throwableObjects = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkInterval();
    }


    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.cameraX, 0);
        // Insert Fixed Objects here
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
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
        mo.drawFrameHitbox(this.ctx);

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


    checkInterval() {
        setInterval(() => {
            this.checkCollisions();
            this.checkBottlePickup();
            this.checkThrowObjects();
        }, 100);
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }


    checkBottlePickup() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.bottlePickup();
                this.statusbarBottle.setPercentage(this.character.bottles);
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 44, this.character.y + 100)
            this.throwableObjects.push(bottle);
        }
    }
}
