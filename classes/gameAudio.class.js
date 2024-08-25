class GameAudio {


  /**
   * Constructs an instance of the class, initializing and configuring various audio elements.
   *
   * The constructor initializes several audio elements for different game actions and states, such as background music, sound effects for running, jumping, picking up items, and more. 
   * Each audio element is configured with a specific volume, and some are also adjusted for playback speed. 
   * All initialized audio elements are stored in an array for easy management.
   */
  constructor() {
    this.soundtrack = new Audio("./assets/audio/soundtrack.mp3");
    this.soundtrack.volume = 0.2;
    this.soundtrack.preload = "auto";

    this.runningSound = new Audio("./assets/audio/running.mp3");
    this.runningSound.volume = 0.4;
    this.runningSound.playbackRate = 1.8;

    this.coinPickupSound = new Audio("./assets/audio/coinPickup.mp3");
    this.coinPickupSound.volume = 0.4;

    this.bottlePickupSound = new Audio("./assets/audio/bottlePickup.mp3");
    this.bottlePickupSound.volume = 0.4;

    this.jumpSound = new Audio("./assets/audio/jump.mp3");
    this.jumpSound.volume = 0.2;

    this.snoringSound = new Audio("./assets/audio/snoring.mp3");
    this.snoringSound.volume = 0.8;

    this.hurtSound = new Audio("./assets/audio/hurt.mp3");
    this.hurtSound.volume = 0.4;
    this.hurtSound.playbackRate = 2;

    this.chickenDeadSound = new Audio("./assets/audio/chickenDead.mp3");
    this.chickenDeadSound.volume = 0.6;
    this.chickenDeadSound.playbackRate = 2.5;

    this.endbossAttackSound = new Audio("./assets/audio/endbossAttack.mp3");
    this.endbossAttackSound.volume = 0.6;

    this.endbossHitSound = new Audio("./assets/audio/endbossHit.mp3");
    this.endbossHitSound.volume = 0.6;
    this.endbossHitSound.playbackRate = 2;

    this.gameOverSound = new Audio("./assets/audio/gameOver.mp3");
    this.endbossHitSound.volume = 0.6;

    this.gameWinSound = new Audio("./assets/audio/gameWin.mp3");
    this.endbossHitSound.volume = 0.6;

    this.bottleBroken = new Audio("./assets/audio/bottleBroken.mp3");
    this.bottleBroken.playbackRate = 2;

    this.audioArray = [
      this.soundtrack,
      this.runningSound,
      this.coinPickupSound,
      this.bottlePickupSound,
      this.jumpSound,
      this.snoringSound,
      this.hurtSound,
      this.chickenDeadSound,
      this.endbossAttackSound,
      this.endbossHitSound,
      this.gameOverSound,
      this.gameWinSound,
      this.bottleBroken,
    ];
  }


  /**
   * Mutes or unmutes all audio elements in the audio array.
   *
   * @param {boolean} mute - A boolean value indicating whether to mute (true) or unmute (false) the audio.
   */
  muteAudio(mute) {
    this.audioArray.forEach((audio) => {
      audio.muted = mute;
    });
  }

  
  /**
   * Stops all audio elements in the audio array by pausing them and resetting their playback position to the start.
   */
  stopAllAudio() {
    this.audioArray.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }
}
