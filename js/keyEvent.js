const KEYS = {
  ' ': 'DOWN',
  q: 'LEFT',
  d: 'RIGHT',
  a: 'TURN_LEFT',
  e: 'TURN_RIGHT'
};

export let inputs = [];

window.addEventListener('keydown', ({ key }) => {
  console.log(key);
  const input = KEYS[key];
  if (input && !inputs.includes(input)) inputs.push(input);
});

window.addEventListener('keyup', ({ key }) => {
  const input = KEYS[key];
  if (input && inputs.includes(input)) inputs = inputs.filter(i => i !== input);
});
