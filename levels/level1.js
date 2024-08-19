let level1;
function initLevel() { 

level1 = new Level(
    [
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
        // new Chick(),
    ],
    [
        new Endboss()
    ],
    [
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 100 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 800 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 1500 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 2200 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 2900 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 3600 + Math.random() * 100),
        new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 4300 + Math.random() * 100)
    ],                                               
    [
        new Coin(),
        new Coin(),
        new Coin(),
        // new Coin(),
        // new Coin(),
        // new Coin(),
        // new Coin(),
        // new Coin(),
        // new Coin(),
        // new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ],
    [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3)
    ]
);
}