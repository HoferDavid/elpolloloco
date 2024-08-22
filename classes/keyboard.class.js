class Keyboard {
    RIGHT = false;
    LEFT = false;
    SPACE = false;
    D = false;
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