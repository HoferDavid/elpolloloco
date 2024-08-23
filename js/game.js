let canvas;
let thisworld;
let keyboard = new Keyboard();


function startGame() {
  document.getElementById('canvas').style.display = 'flex';
  document.getElementById('startGameScreen').style.display = 'flex';
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  // toggleAudio(); // to delete
}


function reStartGame() {
  document.getElementById('canvas').style.display = 'flex';
  document.getElementById('restartGameScreen').style.display = 'none';
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
}


function gameEnd(result) {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  let sound = result === 'winScreen' ? world.audio.gameWinSound : world.audio.gameOverSound;
  clearAllIntervals();
  clearAllAudioIntervals();
  document.getElementById('controlsOverlay').style.display = 'none';

  // document.getElementById('startGameScreen').style.display = 'none';

  setTimeout(() => {
    document.getElementById(result).style.display = 'flex';
    sound.play();
  }, 500);

  document.getElementById('startGameScreen').style.display = 'none';
  
  setTimeout(() => {
    document.getElementById(result).style.display = 'none';
    toggleClasses('canvas', 'restartGameScreen');
  }, sound.duration * 1000);
}


function backtoMenu() {
  document.getElementById('startGameScreen').style.display = 'none';
  if (document.fullscreenElement) {
    document.exitFullscreen();
  }
  clearAllIntervals();
  clearAllAudioIntervals();
  toggleClasses('canvas', 'restartGameScreen');
  document.getElementById('controlsOverlay').style.display = 'none';
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
  let element = document.getElementById("game");
  if (!document.fullscreenElement) {
    element.requestFullscreen();
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


function checkScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  checkScreenOrientation(width, height);
  if (height <= 850) {
    hideDesktopInfos();
  }
  if (width > 1400 && width > height) {
    document.getElementById('touchControls').style.display = 'flex';
  }
}


function hideDesktopInfos() {
  toggleClasses('howtoSection', 'touchControls');
  document.getElementById('infoSection').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
}


function checkScreenOrientation(width, height) {
  if (width <= 800 && height > width || height > width) {
    showRotateOverlay();
  } else {
    hideRotateOverlay();
  }
}


function showRotateOverlay() {
  toggleClasses('game', 'touchControls');
  toggleClasses('howtoSection', 'rotateOverlay');
  document.getElementById('infoSection').style.display = 'none';
}


function hideRotateOverlay() {
  toggleClasses('touchControls', 'game');
  toggleClasses('rotateOverlay', 'howtoSection');
  document.getElementById('infoSection').style.display = 'flex';
}