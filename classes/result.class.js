class Result extends DrawableObject {
    WIN = [
        './assets/img/9_intro_outro_screens/win/win_1.png',
        './assets/img/9_intro_outro_screens/win/win_2.png',
        './assets/img/9_intro_outro_screens/win/won_1.png',
        './assets/img/9_intro_outro_screens/win/won_2.png'
    ];
    LOSE = [
        './assets/img/9_intro_outro_screens/game_over/game over!.png',
        './assets/img/9_intro_outro_screens/game_over/game over.png',
        './assets/img/9_intro_outro_screens/game_over/oh no you lost!.png',
        './assets/img/9_intro_outro_screens/game_over/you lost.png'
    ];


    constructor() {
        super();
        this.setRandomImage(this.WIN);
        this.setRandomImage(this.LOSE);

        this.logs;
    }


    logs() {
        console.log(win);
        
    }


}