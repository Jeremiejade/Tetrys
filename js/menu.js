import { KEYS, PAUSE_KEYS, TURN_KEYS } from './keyEvent.js';

const turnKeysName = Object.values(TURN_KEYS);
const keysName = Object.values(KEYS);

export function buildFirstMenu(launchGame, state) {
  const menu = document.getElementById('menu');
  menu.classList.add('display');
  menu.innerHTML = `  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">y</span>
    <span class="s">s</span>
  </h1>`;

  if (state) {
    menu.innerHTML += `<h2>GAME OVER</h2>
<div>
<p>Score: ${state.score}</p>
<p>Time: ${state.time}</p>
</div>
`;
  }
  menu.innerHTML += `<ul>
    <li>
        <button id="new-game">NEW GAME</button>
    </li>
    <li>
        <button id="option">Controls</button>
    </li>
</ul>`;
  const newGameButton = document.getElementById('new-game');
  newGameButton.addEventListener('click', () => {
    menu.classList.remove('display');
    launchGame();
  });

  const optionsButton = document.getElementById('option');
  optionsButton.addEventListener('click', () => {
    buildOptions(menu, launchGame, state);
  });
}

export function buildPause() {
  let resolvePromise = null;
  const menu = document.getElementById('menu');
  menu.classList.add('display');
  menu.innerHTML = `  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">y</span>
    <span class="s">s</span>
  </h1>
    <h2>PAUSE</h2>`;

  const resumeButton = document.createElement('button');
  resumeButton.id = 'valid-control';
  resumeButton.innerText = 'Resume game';
  resumeButton.addEventListener('click', () => {
    menu.classList.remove('display');
    resolvePromise();
  });
  menu.appendChild(resumeButton);

  const restartButton = document.createElement('button');
  restartButton.id = 'valid-control';
  restartButton.innerText = 'Restart';
  restartButton.addEventListener('click', () => {
    menu.classList.remove('display');
    resolvePromise('restart');
  });
  menu.appendChild(restartButton);

  return new Promise(resolve => {
    resolvePromise = resolve;
  });
}

function buildOptions(menu, gameState, state) {
  menu.innerHTML = `
  <h1>
    <span class="t">T</span>
    <span class="e">e</span>
    <span class="tt">t</span>
    <span class="r">r</span>
    <span class="y">Y</span>
    <span class="s">s</span>
  <h1>
  <h2>Control</h2>
  `;
  for (const k in KEYS) {
    menu.appendChild(buildKeyInput(KEYS[k], k, menu));
    delete KEYS[k];
  }
  for (const k in TURN_KEYS) {
    menu.appendChild(buildKeyInput(TURN_KEYS[k], k, menu));
    delete TURN_KEYS[k];
  }
  for (const k in PAUSE_KEYS) {
    menu.appendChild(buildKeyInput(PAUSE_KEYS[k], k, menu));
    delete PAUSE_KEYS[k];
  }

  const button = document.createElement('button');
  button.innerText = 'Ok';
  button.id = 'valid-control';
  button.addEventListener('click', () => {
    const inputsHtml = menu.querySelectorAll('.key-input');

    inputsHtml.forEach(input => {
      const name = input.dataset.name;
      const key = input.dataset.key;
      if (turnKeysName.includes(name)) {
        TURN_KEYS[key] = name;
      } else if (keysName.includes(name)) {
        KEYS[key] = name;
      } else {
        PAUSE_KEYS[key] = name;
      }
    });
    buildFirstMenu(gameState, state);
  });
  menu.appendChild(button);
}

function buildKeyInput(name, currentKey, menu) {
  let edition = false;
  const div = document.createElement('div');
  div.classList.add('key-input');
  div.dataset.key = currentKey;
  div.dataset.name = name;
  div.setAttribute('tabIndex', '0');
  div.innerHTML = `<p>${name} :</p><p>${keyByName(currentKey)}</p>`;
  div.addEventListener('click', () => {
    edition = updateEdition(div, true);
  });
  div.addEventListener('focusout', () => {
    edition = updateEdition(div, false);
  });
  window.addEventListener('keydown', ({ key }) => {
    if (edition) {
      const inputsHtml = menu.querySelectorAll('.key-input');
      const inputsKey = [];
      inputsHtml.forEach(i => inputsKey.push(i.dataset.key));
      if (inputsKey.includes(key)) return;
      div.dataset.key = key;
      div.innerHTML = `<p>${name} :</p><p>${keyByName(key)}</p>`;
      edition = updateEdition(div, false);
    }
  });
  return div;
}

function updateEdition(div, on) {
  if (!on) {
    div.classList.remove('edition');
    return on;
  }
  div.classList.add('edition');
  return on;
}

function keyByName(key) {
  if (key === ' ') return 'SPACE';
  return key;
}
