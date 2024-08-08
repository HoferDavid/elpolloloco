class Level {
    character;
    enemies;
    clouds;
    coins;
    backgroundObjects;
    levelEndX = 2200;

    constructor(enemies, clouds, coins, backgroundObjects, soundtrack) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}