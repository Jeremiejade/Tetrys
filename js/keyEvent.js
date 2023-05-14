const KEYS = {
  ' ': 'TURN',
  Control: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
};

export let inputs = [];

window.addEventListener('keydown', ({ key }) => {
  const input = KEYS[key];
  if (input && !inputs.includes(input)) inputs.push(input);
});

window.addEventListener('keyup', ({ key }) => {
  const input = KEYS[key];
  if (input && inputs.includes(input)) inputs = inputs.filter(i => i !== input);
});
