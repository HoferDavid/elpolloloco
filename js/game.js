let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
  toggleClasses('startGameScreen', 'canvas');
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  toggleAudio(); // to delete
}


function reStartGame() {
  toggleClasses('restartGameScreen', 'canvas');
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}


function gameWin() {
  clearAllIntervals();
  clearAllAudioIntervals();

  document.getElementById('controlsOverlay').style.display = 'none';

  setTimeout(() => {
    toggleClasses('canvas', 'winScreen');
    world.audio.gameWinSound.play();
  }, 1000);

  setTimeout(() => {
    toggleClasses('winScreen', 'restartGameScreen');
  }, world.audio.gameWinSound.duration * 1000);
}


function gameOver() {
  clearAllIntervals();
  clearAllAudioIntervals();

  document.getElementById('controlsOverlay').style.display = 'none';

  setTimeout(() => {
    toggleClasses('canvas', 'loseScreen');
    world.audio.gameOverSound.play();
  }, 500);

  setTimeout(() => {
    toggleClasses('loseScreen', 'restartGameScreen');
  }, world.audio.gameOverSound.duration * 1000);
}


function handleKey(event) {
  const keyMap = {
    "ArrowRight": "RIGHT",
    "ArrowLeft": "LEFT",
    " ": "SPACE",
    "d": "D",
  };
  if (keyMap[event.key]) keyboard[keyMap[event.key]] = event.type === 'keydown';
}


function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}


function clearAllAudioIntervals() {
  if (world && world.audio) {
    world.audio.stopAllAudio();
  }
}


function toggleFullscreen() {
  console.log('fullscreenBtn clicked');

  let elem = document.getElementById("game");

  if (!document.fullscreenElement) {
    elem.requestFullscreen();
    document.getElementById('fullscreenBtn').src = 'assets/img/icons/fullscreenExit.svg';
  } else {
    document.exitFullscreen();
    document.getElementById('fullscreenBtn').src = 'assets/img/icons/fullscreenOpen.svg';
  }
}


function toggleAudio() {
  let audioBtn = document.getElementById('audioBtn');
  let currentSrc = audioBtn.src.split("/").pop();
  let mute = currentSrc === 'audio.png';
  if (mute) {
    audioBtn.src = 'assets/img/icons/audioMuted.png';
    console.log('audio mute');
  } else {
    audioBtn.src = 'assets/img/icons/audio.png';
    console.log('audio unmute');
  }
  world.audio.muteAudio(mute);
}


function toggleClasses(a, b) {
  document.getElementById(a).style.display = 'none';
  document.getElementById(b).style.display = 'flex';
}


window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);
window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);


function checkScreenSize() {
  if (window.innerWidth <= 800) {
    document.getElementById('touchControls').style.display = 'flex';
    document.getElementById('rotateOverlay').style.display = 'flex';
    document.getElementById('game').style.display = 'none';
    document.getElementById('howtoSection').style.display = 'none';
    document.getElementById('infoSection').style.display = 'none';
  } else {
    document.getElementById('touchControls').style.display = 'none';
    document.getElementById('rotateOverlay').style.display = 'none';
    document.getElementById('game').style.display = 'flex';
    document.getElementById('howtoSection').style.display = 'flex';
    document.getElementById('infoSection').style.display = 'flex';
  }
}



