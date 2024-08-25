class Keyboard {
  RIGHT = false;
  LEFT = false;
  SPACE = false;
  D = false;


  constructor() {
    document.addEventListener("keydown", (e) => {
      this.keydownListener(e);
    });

    document.addEventListener("keyup", (e) => {
      this.keyupListener(e);
    });

    window.addEventListener("DOMContentLoaded", () => {
      this.touchListener();
    });
  }


  /**
   * Handles the 'keydown' event by setting the corresponding direction or action to true
   * based on the pressed key.
   *
   * @param {KeyboardEvent} e - The event object representing the 'keydown' event.
   */
  keydownListener(e) {
    if (e.key == "ArrowRight") {
      this.RIGHT = true;
    }
    if (e.key == "ArrowLeft") {
      this.LEFT = true;
    }
    if (e.key == " ") {
      this.SPACE = true;
    }
    if (e.key == "d") {
      this.D = true;
    }
  }


  /**
   * Handles the 'keyup' event by setting the corresponding direction or action to false
   * based on the released key.
   *
   * @param {KeyboardEvent} e - The event object representing the 'keyup' event.
   */
  keyupListener(e) {
    if (e.key == "ArrowRight") {
      this.RIGHT = false;
    }
    if (e.key == "ArrowLeft") {
      this.LEFT = false;
    }
    if (e.key == " ") {
      this.SPACE = false;
    }
    if (e.key == "d") {
      this.D = false;
    }
  }


  /**
   * Initializes touch event listeners for touchstart and touchend events.
   * 
   * These listeners handle directional movements and actions triggered by touch inputs.
   */
  touchListener() {
    this.touchStart();
    this.touchEnd();
  }


  /**
   * Sets up touchstart event listeners for various controls.
   * 
   * Each control triggers a corresponding direction or action when touched.
   */
  touchStart() {
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });
    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });
    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });
    document.getElementById("startGameBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        startGame();
      });
    document.getElementById("fullscreenBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        toggleFullscreen();
      });
  }
  

  /**
   * Sets up touchend event listeners for various controls.
   * 
   * Each control stops the corresponding direction or action when the touch ends.
   */
  touchEnd() {
    document.getElementById("btnRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
    document.getElementById("btnJump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}
