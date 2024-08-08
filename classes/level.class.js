class Level {
    character;
    enemies;
    clouds;
    coins;
    backgroundObjects;
    levelEndX = 2200;

    constructor(enemies, clouds, backgroundObjects, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}