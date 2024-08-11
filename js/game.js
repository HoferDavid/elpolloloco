let canvas;
let world;
let keyboard = new Keyboard();
soundtrack = new Audio('./assets/audio/background.mp3');


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);

    // this.soundtrack.play();
    soundtrack.volume = 0.8;
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


