import { KEYS, TURN_KEYS } from "./keyEvent.js";

const turnKeysName = Object.values(TURN_KEYS);

export function buildFirstMenu(launchGame, state) {
  const menu = document.getElementById('menu');
  menu.classList.add('display');
  menu.innerHTML = '';
  if (state) {
    menu.innerHTML = `<h1>GAME OVER</h1>
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
    launchGame()
  });

  const optionsButton = document.getElementById('option');
  optionsButton.addEventListener('click', () => {
    buildOptions(menu, launchGame, state)
  });
}

function buildOptions(menu, gameState, state) {
  menu.innerHTML = `
  <h1>Control</h1>
  `
  for (let k in KEYS) {
    menu.appendChild(buildKeyInput(KEYS[k], k, menu));
    delete KEYS[k];
  }
  for (let k in TURN_KEYS) {
    menu.appendChild(buildKeyInput(TURN_KEYS[k], k, menu));
    delete TURN_KEYS[k];
  }
  const button = document.createElement('button');
  button.innerText = 'Ok';
  button.id = 'valid-control'
  button.addEventListener('click', () => {
    const inputsHtml = menu.querySelectorAll('.key-input');

    inputsHtml.forEach(input => {
      const name = input.dataset.name;
      const key = input.dataset.key;
      if (turnKeysName.includes(name)) {
        TURN_KEYS[key] = name;
      } else {
        KEYS[key] = name;
      }
    })
    buildFirstMenu(gameState, state)
  });
  menu.appendChild(button)
}

function buildKeyInput(name, currentKey, menu){
  let edition = false
  const div = document.createElement('div');
  div.classList.add('key-input')
  div.dataset.key = currentKey;
  div.dataset.name = name;
  div.setAttribute('tabIndex', '0');
  div.innerHTML = `<p>${name} :</p><p>${keyByName(currentKey)}</p>`;
  div.addEventListener('click', () => {
    edition = updateEdition(div, true)
  });
  div.addEventListener('focusout', () => edition = updateEdition(div, false))
  window.addEventListener('keydown', ({ key }) => {
    if(edition) {
      const inputsHtml = menu.querySelectorAll('.key-input');
      const inputsKey = [];
      inputsHtml.forEach(i => inputsKey.push(i.dataset.key));
      if(inputsKey.includes(key)) return
      div.dataset.key = key;
      div.innerHTML = `<p>${name} :</p><p>${keyByName(key)}</p>`
      edition = updateEdition(div, false)
    }
  });
  return div;
}

function updateEdition(div, on) {
  if(!on) {
    div.classList.remove('edition')
    return on
  }
  div.classList.add('edition')
  return on
}

function keyByName(key) {
  if(key === ' ') return 'SPACE'
  return key;
}