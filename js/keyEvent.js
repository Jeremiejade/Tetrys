export const KEYS = {
  s: 'DOWN',
  q: 'LEFT',
  d: 'RIGHT',
};

export const TURN_KEYS = {
  ' ': 'TURN_LEFT',
  e: 'TURN_RIGHT',
};

export const PAUSE_KEYS = {
  Escape: 'PAUSE',
};

export const GAMEPAD_KEYS = {
  0: 'DOWN',
  1: 'RIGHT',
  2: 'LEFT',
};

export const GAMEPAD_TURN_KEYS = {
  4: 'TURN_LEFT',
  5: 'TURN_RIGHT',
};

export const GAMEPAD_PAUSE_KEYS = {
  9: 'PAUSE',
};

export let inputs = [];
export const turnInput = {
  state: null,
};

export const pauseInput = {
  state: null,
};

export function resetInput() {
  inputs = [];
  turnInput.state = null;
  pauseInput.state = null;
}

window.addEventListener('keydown', ({ key }) => {
  const input = KEYS[key];
  if (input && !inputs.includes(input)) inputs.push(input);
  const it = TURN_KEYS[key];
  if (it) turnInput.state = it;
  const ip = PAUSE_KEYS[key];
  if (ip) pauseInput.state = ip;
});

window.addEventListener('keyup', ({ key }) => {
  const input = KEYS[key];
  if (input && inputs.includes(input)) inputs = inputs.filter(i => i !== input);
});

let startGameInput, inputState = {
  4: false,
  5: false,
};

window.addEventListener("gamepadconnected", (e) => {
  console.log(
    {
      a: "Gamepad connected at index %d: %s. %d buttons, %d axes.",
      b: e.gamepad.index,
      c: e.gamepad.id,
      d: e.gamepad.buttons.length,
      f: e.gamepad.axes.length
    }
  );
  gameLoop()
});

function buttonPressed(b) {
  if (typeof b === "object") {
    return b.pressed;
  }
  return b === 1.0;
}

function axisPressed(a) {
 return a.toFixed(1)
}

function gameLoop(f) {
  const gamepads = navigator.getGamepads();
  if (!gamepads) {
    return;
  }

  const gp = gamepads[0];
  for (let i = 0; i < 20; i++) {
    let input = null;
    const isPressed = buttonPressed(gp.buttons[i]);
    if(GAMEPAD_KEYS[i]) {
      input = GAMEPAD_KEYS[i];
      if(isPressed && !inputs.includes(input)){
        inputs.push(input);
      }
      else if (!isPressed && inputs.includes(input)) {
        inputs = inputs.filter(i => i !== input)
      }
    }
    if(GAMEPAD_TURN_KEYS[i] ) {
      if(isPressed && !inputState[i]) {
        turnInput.state = GAMEPAD_TURN_KEYS[i];
        inputState[i] = true;
      } else if(!isPressed && inputState[i]) inputState[i] = false
    }
    if(GAMEPAD_PAUSE_KEYS[i] && isPressed ) {
      pauseInput.state = GAMEPAD_PAUSE_KEYS[i];
    }
  }


    const axisXPosition = axisPressed(gp.axes[0]);
    const axisYPosition = axisPressed(gp.axes[1]);
    const inputLeft = GAMEPAD_KEYS[2];
    const inputRight = GAMEPAD_KEYS[1];
    const inputDown = GAMEPAD_KEYS[0];

    if (axisXPosition > 0.3 && !inputs.includes(inputRight)) {
      inputs.push(inputRight);
    } else if(inputs.includes(inputRight)) {
      inputs = inputs.filter(i => i !== inputRight)
    }

    if (axisXPosition < -0.3 && !inputs.includes(inputLeft)) {
      inputs.push(inputLeft);
    } else if(inputs.includes(inputLeft)) {
      inputs = inputs.filter(i => i !== inputLeft)
    }

    if (axisYPosition > 0.5 && !inputs.includes(inputDown)) {
    inputs.push(inputDown);
    } else if(inputs.includes(inputDown)) {
      inputs = inputs.filter(i => i !== inputDown)
    }

  startGameInput = requestAnimationFrame(gameLoop);
}
