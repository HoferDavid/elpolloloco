class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 2200;

    constructor(enemies, clouds, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}