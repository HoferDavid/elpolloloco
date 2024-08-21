class Endboss extends MovableObject {
  y = 50;
  x = 2900;
  height = 400;
  width = 240;
  offset = {
    x: 40,
    y: 72,
    h: -140,
    w: -80,
  };
  speed = 0.15 + Math.random() * 0.2;

  IMAGES_WALK = [
    "./assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "./assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "./assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "./assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "./assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "./assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "./assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "./assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImg(this.IMAGES_WALK[0]);
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animationInterval = null;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 120);

    setInterval(() => {
      const distance = this.x - world.character.x;
      if (distance < 400 && distance > 0) {
        this.animateObject(this.IMAGES_ATTACK);
        world.audio.endbossAttackSound.play();
      } else if (distance < 500) {
        this.animateObject(this.IMAGES_ALERT);
        this.speed = 0;
      } else if (distance >= 500) {
        this.animateObject(this.IMAGES_WALK);
        this.speed = 0.15 + Math.random() * 0.2;
      }
    }, 160);
  }


  endbossHit() {
    this.energy -= 20;

    if (this.energy > 0) {
      this.animateObject(this.IMAGES_HURT);
    } else if (!this.isDead) {
      setInterval(() => {
        world.audio.chickenDeadSound.play();
        this.animateObject(this.IMAGES_DEAD);
        setTimeout(() => {
          gameEnd('winScreen');
        }, 600);
      }, 200);
    }
  }
}
