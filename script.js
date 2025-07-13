'use strict';

const WINNING_SCORE = 50;

// Getting the Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const player0SectionEl = document.querySelector('.player--0');
const player1SectionEl = document.querySelector('.player--1');

// On Dice ROll
document.querySelector('.btn--roll').addEventListener('click', rollDice);

// On Hold
document.querySelector('.btn--hold').addEventListener('click', hold);

// New Game
document.querySelector('.btn--new').addEventListener('click', newGame);

let scores, currentScore, activePlayer, playing;

// Initialize/reset the game
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
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function hold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] > WINNING_SCORE) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    }

    switchPlayer();
  }
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0SectionEl.classList.toggle('player--active');
  player1SectionEl.classList.toggle('player--active');
}

function newGame() {
  init();
}
