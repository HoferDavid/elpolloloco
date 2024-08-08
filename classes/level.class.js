class Level {
    character;
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 2200;

    constructor(enemies, clouds, backgroundObjects, chicks) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}