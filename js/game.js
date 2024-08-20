let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
  toggleClasses("startGameScreen", "canvas");
  document.getElementById('controlsOverlay').style.display = 'flex';
  document.getElementById('controlsOverlay').classList.add('visible');
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


function reStartGame() {
  toggleClasses("restartGameScreen", "canvas");
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


function gameWin() {
  clearAllIntervals();
  clearAllAudioIntervals();

  setTimeout(() => {
    toggleClasses("canvas", "winScreen");
    world.audio.gameWinSound.play();
  }, 1000);

  setTimeout(() => {
    toggleClasses("winScreen", "restartGameScreen");
  }, world.audio.gameWinSound.duration * 1000);
}


function gameOver() {
  clearAllIntervals();
  clearAllAudioIntervals();

  setTimeout(() => {
    toggleClasses("canvas", "loseScreen");
    world.audio.gameOverSound.play();
  }, 500);

  setTimeout(() => {
    toggleClasses("loseScreen", "restartGameScreen");
  }, world.audio.gameOverSound.duration * 1000);
}


function handleKey(event) {
  const keyMap = {
    "ArrowRight": "RIGHT",
    "ArrowLeft": "LEFT",
    " ": "SPACE",
    "d": "D",
  };
  if (keyMap[event.key]) keyboard[keyMap[event.key]] = event.type === "keydown";
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


function togglePause() {
  console.log('pause');
  clearAllIntervals();
}


function toggleAudio() {
  let audioBtn = document.getElementById("audioBtn");
  let currentSrc = audioBtn.src.split("/").pop();
  let mute = currentSrc === "audio.png";
  if (mute) {
    audioBtn.src = "assets/img/icons/audioMuted.png";
    console.log("audio mute");
  } else {
    audioBtn.src = "assets/img/icons/audio.png";
    console.log("audio unmute");
  }
  world.audio.muteAudio(mute);
}


function toggleClasses(a, b) {
  const elementA = document.getElementById(a);
  const elementB = document.getElementById(b);

  elementA.classList.remove('visible');
  
  setTimeout(() => {
    elementA.style.display = 'none';
    elementB.style.display = 'flex';
    elementB.classList.add('visible');
  }, 500);
}


window.addEventListener("keydown", handleKey);
window.addEventListener("keyup", handleKey);
