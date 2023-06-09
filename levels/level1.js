const level1 = new Level(
    
[
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss()
],

[
    new Clouds
],

[
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins(),
    new Coins()
],

[
    new BackgroundObject('img/5_background/layers/air.png', -719, 80),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719, 80),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719, 80),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719, 80),
    
    new BackgroundObject('img/5_background/layers/air.png', 0, 80),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 0, 80),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 0, 80),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 0, 80),

    new BackgroundObject('img/5_background/layers/air.png', 719, 80),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719, 80),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719, 80),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719, 80),

    new BackgroundObject('img/5_background/layers/air.png', 719*2, 80),
    new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*2, 80),
    new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*2, 80),
    new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*2, 80),

    new BackgroundObject('img/5_background/layers/air.png', 719*3, 80),
    new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*3, 80),
    new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*3, 80),
    new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*3, 80),
],

[
   new Endscreen('img/9_intro_outro_screens/game_over/game over!.png') 
]
);