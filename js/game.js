let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
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


