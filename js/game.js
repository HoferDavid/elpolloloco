let canvas;
let thisworld;
let keyboard = new Keyboard();
let audioMuted = sessionStorage.getItem('audioMuted') === 'true';


function startGame() {
  handleDisplayStyle('startGameScreen');
  resetGame();
}


function handleDisplayStyle(id) {
  let { width, height } = getScreenSize();
  if (width <= 932) {
    document.getElementById(id).style.display = 'flex';
  } else {
    document.getElementById(id).style.display = 'none';
  }
}


function reStartGame() {
  handleDisplayStyle('restartGameScreen');
  resetGame();
}


function resetGame() {
  document.getElementById('canvas').style.display = 'flex';
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  audioMuted = sessionStorage.getItem('audioMuted') === 'true';

  if (audioMuted) {
    world.audio.muteAudio(true);
  } else {
    world.audio.soundtrack.play();
  }
}


function gameEnd(result) {
  let sound = result === 'winScreen' ? world.audio.gameWinSound : world.audio.gameOverSound;
  clearAllIntervals();
  clearAllAudioIntervals();
  document.getElementById('controlsOverlay').style.display = 'none';

  document.getElementById(result).style.display = 'flex';
  sound.play();
  document.getElementById('startGameScreen').style.display = 'none';

  setTimeout(() => {
    document.getElementById(result).style.display = 'none';
    toggleClasses('canvas', 'restartGameScreen');
  }, sound.duration * 1000);
  if (document.fullscreenElement) { document.exitFullscreen(); }
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
    sessionStorage.setItem('audioMuted', 'true');
    world.audio.muteAudio(true);
  } else {
    audioBtn.src = 'assets/img/icons/audio.png';
    sessionStorage.setItem('audioMuted', 'false');
    world.audio.muteAudio(false);
  }
}


function toggleClasses(a, b) {
  document.getElementById(a).style.display = 'none';
  document.getElementById(b).style.display = 'flex';
}


window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);


function getScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return { width, height };
}


function checkScreenSize() {
  let { width, height } = getScreenSize();
  checkScreenOrientation(width, height);
  hideElements(width, height);
}


function hideElements(width, height) {
  if (height <= 850) {
    hideDesktopInfos();
  }
  if (width > 1400 && height > 1000) {
    document.getElementById('touchControls').style.display = 'none';
  } else {
    document.getElementById('touchControls').style.display = 'flex';
  }
}


function hideDesktopInfos() {
  toggleClasses('howtoSection', 'touchControls');
  document.getElementById('infoSection').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
}


function checkScreenOrientation(width, height) {
  if (width <= 800 && height > width || height > width && !document.fullscreenElement) {
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