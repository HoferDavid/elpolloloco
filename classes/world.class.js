class World {
  character = new Character();
  endboss = new Endboss();
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

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkInterval();
    this.throwableObjects = [];
    this.audio.soundtrack.play();
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
      this.checkCollisions();
      this.checkCoinPickup();
      this.checkBottlePickup();
      this.gameOver();
      this.endbossAnimations();
    }, 20);
    setInterval(() => {
      this.throwObjects();
      this.throwObjectCollision();
    }, 200);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY <= 0
      ) {
        this.character.jumpOnEnemy();
        enemy.isDead();
        enemy.dead = true;
        setTimeout(() => {
          this.level.enemies.splice(i, 1);
        }, 50);
      } else if (
        this.character.isColliding(enemy) &&
        this.character.speedY < 0
      ) {
        if (enemy instanceof Endboss) {
          this.damage = 8;
        } else if (enemy instanceof Chicken) {
          this.damage = 2;
        } else {
          this.damage = 1;
        }
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


  throwObjectCollision() {
    outerLoop: for (let i = 0; i < this.throwableObjects.length; i++) {
      let bottle = this.throwableObjects[i];

      for (let j = 0; j < this.level.enemies.length; j++) {
        let enemy = this.level.enemies[j];

        if (bottle.isColliding(enemy) && enemy instanceof Endboss) {
          console.log('bottle hit endboss');
          setTimeout(() => {
            bottle.splashAnimation();
          }, 200);

          enemy.health -= 20;
          if(enemy.health <= 0) {
            enemy.isDead();
          } else {
            enemy.isHurt();
          }

          this.setPercentage(this.statusbarEndboss, enemy.health)
          setTimeout(() => {
            this.throwableObjects.splice(j, 1);
          }, 1000);
        } else if (bottle.isColliding(enemy)) {
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




  endbossAnimations() {
    const distance = this.endboss.x - this.character.x;    

    if (distance > 500) {
      this.endboss.isWalking();

      // console.log('>500, should walk');      
    }
    if (distance < 500) {
      this.endboss.isInAlert();

      // console.log('<200, should alert');      
    }
  }


  gameOver() {
    if (this.statusbarHealth.percentage === 0) {
      clearAllIntervals();

      // Add Random Endscreen Animation + Audio

      setTimeout(() => {
        toggleClasses("canvas", "endScreen");
      }, 2000);
    }
  }
}
