let canvas;
let thisworld;
let keyboard = new Keyboard();


function startGame() {
  document.getElementById('startGameScreen').style.display = 'none';
  resetGame();
}


function reStartGame() {
  document.getElementById('restartGameScreen').style.display = 'none';
  resetGame();
}


function resetGame() {
  document.getElementById('canvas').style.display = 'flex';
  document.getElementById('controlsOverlay').style.display = 'flex';
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);

  world.audio.soundtrack.play();
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
  if (width <= 800 && height > width || height > width) { // if (width <= 800 && height > width || height > width) {
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