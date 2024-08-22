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


function gameEnd(result) {
  let sound = result === 'winScreen' ? world.audio.gameWinSound : world.audio.gameOverSound;
  clearAllIntervals();
  clearAllAudioIntervals();
  document.getElementById('controlsOverlay').style.display = 'none';
  setTimeout(() => {
    document.getElementById(result).style.display = 'flex';
    sound.play();
  }, 500);
  setTimeout(() => {
    document.getElementById(result).style.display = 'none';
    toggleClasses('canvas', 'restartGameScreen');
  }, sound.duration * 1000);
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

window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);






window.addEventListener('load', checkScreenSize);
window.addEventListener('resize', checkScreenSize);


function checkScreenSize() {
  checkScreenWidth();
  checkScreenHeight();
}


function checkScreenHeight() {
  console.log(window.innerHeight);

  if (window.innerHeight < 900) {
    screenHeightMobile();
  } else {
    screenHeightDesktop();
  }
}


function screenHeightMobile() {
  document.getElementById('howtoSection').style.display = 'none';
  document.getElementById('infoSection').style.display = 'none';
  document.getElementById('footer').style.display = 'none';
}


function screenHeightDesktop() {
  document.getElementById('footer').style.display = 'flex';
}


function checkScreenWidth() {
  if (window.innerWidth <= 800) {
    screenWidthMobile();
  } else {
    screenWidthDesktop();
  }
}


function screenWidthMobile() {
  document.getElementById('touchControls').style.display = 'flex';
  document.getElementById('rotateOverlay').style.display = 'flex';
  document.getElementById('game').style.display = 'none';
  document.getElementById('howtoSection').style.display = 'none';
  document.getElementById('infoSection').style.display = 'none';
}


function screenWidthDesktop() {
  document.getElementById('touchControls').style.display = 'none';
  document.getElementById('rotateOverlay').style.display = 'none';
  document.getElementById('game').style.display = 'flex';
  document.getElementById('howtoSection').style.display = 'flex';
  document.getElementById('infoSection').style.display = 'flex';
}