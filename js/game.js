let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
  toggleClasses("startGameScreen", "canvas");
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // toggleAudio(); // Delete it
}


function reStartGame() {
  toggleClasses("restartGameScreen", "canvas");
  clearAllAudioIntervals();
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}


function gameWin() {
  clearAllIntervals();

  setTimeout(() => {
    toggleClasses("canvas", "winScreen");
  }, 1000);

  setTimeout(() => {
    toggleClasses("winScreen", "restartGameScreen");
  }, 3000);
}


function gameOver() {
  clearAllIntervals();

  setTimeout(() => {
    toggleClasses("canvas", "loseScreen");
  }, 1000);

  setTimeout(() => {
    toggleClasses("loseScreen", "restartGameScreen");
  }, 3000);
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
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "flex";
}


window.addEventListener("keydown", handleKey);
window.addEventListener("keyup", handleKey);
