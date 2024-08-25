class Level {
  character;
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  levelEndX = 2900;

  
  constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
