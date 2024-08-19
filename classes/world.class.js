class World {
  character = new Character();
  audio = new GameAudio();
  canvas;
  keyboard;
  ctx;
  cameraX = 0;
  level = level1;
  statusbarHealth = new StatusbarHealth();
  statusbarCoin = new StatusbarCoin();
  statusbarBottle = new StatusbarBottle();
  statusbarEndboss = new StatusbarEndboss();
  throwableObjects = [];
  percentage = 0;
  damage = 0;
  dead = false;

  constructor(canvas, keyboard, endboss) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.endboss = endboss;
    this.draw();
    this.setWorld();
    this.checkInterval();
    this.throwableObjects = [];
    // this.audio.soundtrack.play(); // Unmute it
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawObjects();
    this.drawFixedObjects();
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  drawObjects() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.throwableObjects);
  }

  drawFixedObjects() {
    this.ctx.translate(-this.cameraX, 0);
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarEndboss);
    this.ctx.translate(this.cameraX, 0);
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.mirrorObject) this.mirrorImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawFrameHitbox(this.ctx);
    if (mo.mirrorObject) this.mirrorImageBack(mo);
  }

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
      this.checkCollisionsWithEnemies();
      this.checkCollisionsWithEndboss();
      this.checkCoinPickup();
      this.checkBottlePickup();
    }, 20);
    setInterval(() => {
      this.throwObjects();
      this.throwObjectCollisionEnemy();
      this.throwObjectCollisionEndboss();
    }, 100);
  }

  checkCollisionsWithEnemies() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY <= 0) {
        this.character.jumpOnEnemy();
        this.audio.chickenDeadSound.play();
        enemy.isDead();
        enemy.dead = true;
        setTimeout(() => { this.level.enemies.splice(i, 1); }, 50);
      } else if (this.character.isColliding(enemy) && this.character.speedY < 0) {
        if (enemy instanceof Chicken) { this.damage = 2;} 
        else { this.damage = 1; }
        this.character.hit(this.damage);
        this.character.hasMoved = true;
        this.setPercentage(this.statusbarHealth, this.character.energy);
      }
    });
  }

  checkCollisionsWithEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.damage = 4;
        this.character.hit(this.damage);
        this.character.hasMoved = true;
        this.setPercentage(this.statusbarHealth, this.character.energy);
      }
    });

  }

  setPercentage(statusbar, percentage) {
    statusbar.percentage = percentage;
    let path = statusbar.IMAGES[statusbar.resolveImageIndex()];
    statusbar.img = statusbar.imgCache[path];
  }

  checkCoinPickup() {
    this.level.coins.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.level.coins.splice(i, 1);
        this.setPercentage(this.statusbarCoin, this.character.coins);
      }
    });
  }

  checkBottlePickup() {
    this.level.bottles.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectBottle();
        this.level.bottles.splice(i, 1);
        this.setPercentage(this.statusbarBottle, this.character.bottles);
      }
    });
  }

  throwObjects() {
    if (this.keyboard.D && this.character.bottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 44,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.character.bottles--;
      this.setPercentage(this.statusbarBottle, this.character.bottles);
    }
  }


  throwObjectCollisionEnemy() {
    outerLoop: for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];

      for (let j = 0; j < this.level.enemies.length; j++) {
        let enemy = this.level.enemies[j];

        if (bottle.isColliding(enemy)) {
          this.audio.chickenDeadSound.play();
          bottle.splashAnimation();
          enemy.isDead();
          setTimeout(() => {
            this.level.enemies.splice(j, 1);
          }, 1000);
          break outerLoop;
        }
      }
    }
  }


  throwObjectCollisionEndboss() {
    outerLoop: for (let i = 0; i < this.throwableObjects.length; i++) {
        let bottle = this.throwableObjects[i];
        for (let j = 0; j < this.level.endboss.length; j++) {
            let endboss = this.level.endboss[j];
            if (bottle.isColliding(endboss)) {
              this.audio.endbossHitSound.play();
                this.throwableObjects.splice(i, 1);
                bottle.splashAnimation();
                endboss.endbossHit();
                this.setPercentage(this.statusbarEndboss, endboss.energy);
                break outerLoop;
            }
        }
    }
}
}
