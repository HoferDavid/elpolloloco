let canvas;
let world;
let keyboard = new Keyboard();


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}


window.addEventListener('keydown', (event) => {
    let key = event.key;
    if (key == 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (key == 'ArrowLeft') {
        keyboard.LEFT = true;
    } 
    if (key == 'ArrowUp') {
        keyboard.UP = true;
    } 
    if (key == 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (key == ' ') {
        keyboard.SPACE = true;
    }
});


window.addEventListener('keyup', (event) => {
    let key = event.key;
    if (key == 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (key == 'ArrowLeft') {
        keyboard.LEFT = false;
    } 
    if (key == 'ArrowUp') {
        keyboard.UP = false;
    } 
    if (key == 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (key == ' ') {
        keyboard.SPACE = false;
    }
});