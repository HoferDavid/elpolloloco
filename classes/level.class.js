class Level {
  character;
  enemies;
  endboss;
  clouds;
  coins;
  bottles;
  backgroundObjects;
  levelEndX = 2900;

  
  /**
   * Initializes the game level by assigning the provided objects (enemies, endboss, clouds, coins, bottles, background objects)
   * to the respective properties of the instance.
   *
   * @param {Array<Object>} enemies - The array of enemy objects present in the level.
   * @param {Object} endboss - The endboss object for the level.
   * @param {Array<Object>} clouds - The array of cloud objects in the level.
   * @param {Array<Object>} coins - The array of coin objects that can be collected in the level.
   * @param {Array<Object>} bottles - The array of bottle objects available in the level.
   * @param {Array<Object>} backgroundObjects - The array of background objects that make up the scenery.
   */
  constructor(enemies, endboss, clouds, coins, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.clouds = clouds;
    this.coins = coins;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;
  }
}
