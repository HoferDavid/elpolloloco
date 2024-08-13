let canvas;
let world;
let keyboard = new Keyboard();
soundtrack = new Audio('./assets/audio/background.mp3');
soundtrack.volume = 0.2;


function init() {

}


function startGame() {
    // toggleClasses('startScreen', 'canvas');
    // toggleClasses('endScreen', 'canvas');
    startGameToggleClasses();
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    // this.soundtrack.play();

    console.log('My character is', world.character);
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


function toggleAudio() {
    let audioBtn = document.getElementById('audioBtn');
    let currentSrc = audioBtn.src.split('/').pop();
    if (currentSrc === "audio.png") {
        audioBtn.src = "../assets/img/icons/audioMuted.png";
    } else {
        audioBtn.src = "../assets/img/icons/audio.png";
    }
}


function toggleClasses(a, b) {
    document.getElementById(a).style.display = 'none';
    document.getElementById(b).style.display = 'block';
}


function startGameToggleClasses() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    // document.getElementById('endScreen').style.display = 'block';
}


window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);


