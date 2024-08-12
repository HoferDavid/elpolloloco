let canvas;
let world;
let keyboard = new Keyboard();
soundtrack = new Audio('./assets/audio/background.mp3');


function init() { // add start game button with onclick function to start game
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);

    // this.soundtrack.play();
    soundtrack.volume = 0.2;
}


function handleKey(event) {
    const keyMap = {
        'ArrowRight': 'RIGHT',
        'ArrowLeft': 'LEFT',
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        ' ': 'SPACE',
        'd': 'D'
    }
    if (keyMap[event.key]) {
        keyboard[keyMap[event.key]] = (event.type === 'keydown');
    }
}


window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);


