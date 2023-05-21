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
