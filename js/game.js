let canvas;
let world;
let keyboard = new Keyboard();


function init() {
}


function startGame() {
    toggleClasses('startScreen', 'canvas');
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}


function handleKey(event) {
    const keyMap = {
        'ArrowRight': 'RIGHT',
        'ArrowLeft': 'LEFT',
        ' ': 'SPACE',
        'd': 'D'
    }
    if (keyMap[event.key]) keyboard[keyMap[event.key]] = (event.type === 'keydown');
}


function toggleAudio() {
    let audioBtn = document.getElementById('audioBtn');
    let currentSrc = audioBtn.src.split('/').pop();
    let mute = currentSrc === 'audio.png';
    if (mute) {
        audioBtn.src = "assets/img/icons/audioMuted.png";
        console.log('audio mute');
    } else {
        audioBtn.src = "assets/img/icons/audio.png";
        console.log('audio unmute');
    }
    world.audio.muteAudio(mute);
}



function toggleClasses(a, b) {
    document.getElementById(a).style.display = 'none';
    document.getElementById(b).style.display = 'flex';
}


window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);


