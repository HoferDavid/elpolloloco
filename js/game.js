let canvas;
let world;
let keyboard = new Keyboard();
soundtrack = new Audio('audio/background.mp3');


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    // this.soundtrack.play();
}


function handleKey(event) {
    const keyMap = {
        'ArrowRight': 'RIGHT',
        'ArrowLeft': 'LEFT',
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
        ' ': 'SPACE'
    }
    if (keyMap[event.key]) {
        keyboard[keyMap[event.key]] = (event.type === 'keydown');
    }
}


window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);


