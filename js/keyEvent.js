const KEYS = {
  ' ': 'DOWN',
  q: 'LEFT',
  d: 'RIGHT',
};

const TURN_KEYS = {
  a: 'TURN_LEFT',
  e: 'TURN_RIGHT',
};

export let inputs = [];
export const turnInput = {
  state: null,
};

window.addEventListener('keydown', ({ key }) => {
  const input = KEYS[key];
  if (input && !inputs.includes(input)) inputs.push(input);
  const i = TURN_KEYS[key];
  if (i) turnInput.state = i;
});

window.addEventListener('keyup', ({ key }) => {
  const input = KEYS[key];
  if (input && inputs.includes(input)) inputs = inputs.filter(i => i !== input);
});
