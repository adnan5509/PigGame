'use strict';

// Getting the Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const player0SectionEl = document.querySelector('.player--0');
const player1SectionEl = document.querySelector('.player--1');
const player0NameEl = document.getElementById('name--0');
const player1NameEl = document.getElementById('name--1');
let score0 = 0;
let score1 = 0;
let currentScore0 = 0;
let currentScore1 = 0;
let activePlayer0 = true;

score0El.textContent = 0;
score1El.textContent = 0;
currentScore0El.textContent = 0;
currentScore1El.textContent = 0;

diceEl.classList.add('hidden');

// On Dice ROll
document.querySelector('.btn--roll').addEventListener('click', rollDice);

// On Hold
document.querySelector('.btn--hold').addEventListener('click', hold);

// New Game
document.querySelector('.btn--new').addEventListener('click', newGame);

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0SectionEl.classList.remove('player--winner');
  player1SectionEl.classList.remove('player--winner');

  player0SectionEl.classList.add('player--active');
  player1SectionEl.classList.remove('player--active');
};

init();

function rollDice() {
  const diceScoreRandom = Math.trunc(Math.random() * 6) + 1;
  document.querySelector('.dice').src = `dice-${diceScoreRandom}.png`;
  diceEl.classList.remove('hidden');
  if (activePlayer0) {
    if (diceScoreRandom === 1) {
      currentScore0 = 0;
      currentScore0El.textContent = currentScore0;
      switchPlayer();
    } else {
      currentScore0 += diceScoreRandom;
      currentScore0El.textContent = currentScore0;
    }
  } else {
    if (diceScoreRandom === 1) {
      currentScore1 = 0;
      currentScore1El.textContent = currentScore1;
      switchPlayer();
    } else {
      currentScore1 += diceScoreRandom;
      currentScore1El.textContent = currentScore1;
    }
  }
}

function hold() {
  if (activePlayer0) {
    score0 += currentScore0;
    score0El.textContent = score0;
    currentScore0 = 0;
    currentScore0El.textContent = currentScore0;
    if (score0 > 50) {
      player0SectionEl.classList.add('player--winner');
      player0NameEl.classList.add('player--winner');
      currentScore0 = 0;
      currentScore0El.textContent = currentScore0;
    }
  } else {
    score1 += currentScore1;
    score1El.textContent = score1;
    currentScore1 = 0;
    currentScore1El.textContent = currentScore1;
    if (score1 > 50) {
      player1SectionEl.classList.add('player--winner');
      player1NameEl.classList.add('player--winner');
      currentScore1 = 0;
      currentScore1El.textContent = currentScore1;
    }
  }
  switchPlayer();
}

function switchPlayer() {
  document.querySelector(`.current--${activePlayer}`);
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0SectionEl.classList.toggle('player--active');
  player1SectionEl.classList.toggle('player--active');
}

function newGame() {
  score0 = 0;
  score1 = 0;
  currentScore0 = 0;
  currentScore1 = 0;
  activePlayer0 = true;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0SectionEl.classList.remove('player--winner');
  player0NameEl.classList.remove('player--winner');
  player1SectionEl.classList.remove('player--winner');
  player1NameEl.classList.remove('player--winner');

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  player0SectionEl.classList.add('player--active');
  player1SectionEl.classList.remove('player--active');
}
