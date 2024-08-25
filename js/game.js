let canvas;
let thisworld;
let keyboard = new Keyboard();
let audioMuted = sessionStorage.getItem("audioMuted") === "true";


/**
 * This function handles showing the initial game screen and calls the `resetGame` method to initialize the game.
 */
function startGame() {
  handleDisplayStyle("startGameScreen");
  resetGame();
}


/**
 * This function handles showing the restart game screen and calls the `resetGame` method to reinitialize the game.
 */
function reStartGame() {
  handleDisplayStyle("restartGameScreen");
  resetGame();
}


/**
 * This function configures the canvas and controls overlay, initializes the game world, and manages audio settings
 * based on the user's preferences stored in sessionStorage.
 */
function resetGame() {
  document.getElementById("canvas").style.display = "flex";
  document.getElementById("controlsOverlay").style.display = "flex";
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  audioMuted = sessionStorage.getItem("audioMuted") === "true";
  if (audioMuted) { world.audio.muteAudio(true) } 
  else { world.audio.soundtrack.play() }
}


/**
 * This function shows or hides elements based on the screen width and optionally toggles fullscreen mode.
 *
 * @param {string} id - The ID of the element to show or hide.
 */
function handleDisplayStyle(id) {
  let { width, height } = getScreenSize();
  if (width <= 932) {
    document.getElementById(id).style.display = "flex";
    toggleFullscreen();
  } else {
    document.getElementById(id).style.display = "none";
  }
}


/**
 * This function displays the result screen (win or game over), plays the corresponding sound, 
 * and hides the controls overlay and start/restart game screens. It also manages fullscreen mode.
 *
 * @param {string} result - The result of the game, either "winScreen" or "gameOverScreen".
 */
function gameEnd(result) {
  let sound = result === "winScreen" ? world.audio.gameWinSound : world.audio.gameOverSound;
  clearAllIntervals();
  clearAllAudioIntervals();
  document.getElementById("controlsOverlay").style.display = "none";
  document.getElementById(result).style.display = "flex";
  sound.play();
  document.getElementById("restartGameScreen").style.display = "none";
  document.getElementById("startGameScreen").style.display = "none";
  setTimeout(() => {
    document.getElementById(result).style.display = "none";
    toggleClasses("canvas", "restartGameScreen");
  }, sound.duration * 1000);
  if (document.fullscreenElement) { document.exitFullscreen() }
}


/**
 * This function hides the start game screen, exits fullscreen mode if active, clears all intervals,
 * stops all audio, and shows the restart game screen.
 */
function backtoMenu() {
  document.getElementById("startGameScreen").style.display = "none";
  if (document.fullscreenElement) { document.exitFullscreen() }
  clearAllIntervals();
  clearAllAudioIntervals();
  toggleClasses("canvas", "restartGameScreen");
  document.getElementById("controlsOverlay").style.display = "none";
}


/**
 * This function iterates through a range of interval IDs and clears them.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}


/**
 * This function calls the `stopAllAudio` method of the world object's audio property.
 */
function clearAllAudioIntervals() {
  if (world && world.audio) { world.audio.stopAllAudio() }
}


/**
 * This function requests fullscreen mode if not already in fullscreen, or exits fullscreen mode if active.
 * It also updates the fullscreen button icon and calls `backtoMenu` if exiting fullscreen.
 */
function toggleFullscreen() {
  let element = document.getElementById("game");
  if (!document.fullscreenElement) {
    element.requestFullscreen();
    document.getElementById("fullscreenBtn").src = "assets/img/icons/fullscreenExit.svg";
  } else {
    document.exitFullscreen();
    document.getElementById("fullscreenBtn").src = "assets/img/icons/fullscreenOpen.svg";
    backtoMenu();
  }
}


/**
 * This function updates the audio button icon and stores the audio mute state in sessionStorage.
 */
function toggleAudio() {
  let audioBtn = document.getElementById("audioBtn");
  let currentSrc = audioBtn.src.split("/").pop();
  let mute = currentSrc === "audio.png";
  if (mute) {
    audioBtn.src = "assets/img/icons/audioMuted.png";
    sessionStorage.setItem("audioMuted", "true");
    world.audio.muteAudio(true);
  } else {
    audioBtn.src = "assets/img/icons/audio.png";
    sessionStorage.setItem("audioMuted", "false");
    world.audio.muteAudio(false);
  }
}


/**
 * This function sets the display style of the specified elements to "none" or "flex".
 *
 * @param {string} a - The ID of the element to hide.
 * @param {string} b - The ID of the element to show.
 */
function toggleClasses(a, b) {
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "flex";
}


/**
 * This function sets up event listeners to call `checkScreenSize` when the window is loaded or resized.
 */
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", checkScreenSize);


/**
 * This function returns an object containing the width and height of the window.
 *
 * @returns {{width: number, height: number}} - The width and height of the screen.
 */
function getScreenSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  return { width, height };
}


/**
 * This function checks the current screen size and performs actions like hiding elements or adjusting layout.
 */
function checkScreenSize() {
  let { width, height } = getScreenSize();
  checkScreenOrientation(width, height);
  hideElements(width, height);
}


/**
 * This function adjusts the display of desktop information and touch controls based on the current screen dimensions.
 *
 * @param {number} width - The current screen width.
 * @param {number} height - The current screen height.
 */
function hideElements(width, height) {
  if (height <= 850) { hideDesktopInfos() }
  if (width > 1400 && height > 1000) { document.getElementById("touchControls").style.display = "none" } 
  else { document.getElementById("touchControls").style.display = "flex" }
}


/**
 * This function toggles the visibility of elements related to desktop information and hides the footer.
 */
function hideDesktopInfos() {
  toggleClasses("howtoSection", "touchControls");
  document.getElementById("footer").style.display = "none";
}


/**
 * This function displays or hides a rotate overlay based on the screen orientation and fullscreen state.
 *
 * @param {number} width - The current screen width.
 * @param {number} height - The current screen height.
 */
function checkScreenOrientation(width, height) {
  if ( (width <= 800 && height > width) || (height > width && !document.fullscreenElement)) {
    showRotateOverlay();
  } else {
    hideRotateOverlay();
  }
}


/**
 * This function hides the game element and shows the rotate overlay, adjusting the display of other elements accordingly.
 */
function showRotateOverlay() {
  toggleClasses("game", "touchControls");
  toggleClasses("howtoSection", "rotateOverlay");
}


/**
 * This function shows the game element and hides the rotate overlay, adjusting the display of other elements accordingly.
 */
function hideRotateOverlay() {
  toggleClasses("touchControls", "game");
  toggleClasses("rotateOverlay", "howtoSection");
}
