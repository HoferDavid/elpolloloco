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
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}


function gameWin() {
  clearAllIntervals();
  clearAllAudioIntervals();

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


// function togglePause() {
//   console.log('pause');
// }


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


window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);

window.addEventListener('resize', function(event) {
  console.log(window.innerWidth);

  if (window.innerWidth <= 800) {
    document.getElementById('touchControls').style.display = 'flex';
  } else {
    document.getElementById('touchControls').style.display = 'none';
  }
});
