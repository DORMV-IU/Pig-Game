'use strict';

let scores, currentScore, activePlayer, playing;

//SELECTING ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //ALTERNATE ID CALLING METHOD
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const init = function () {
  //BASE GLOBAL VARIABLES
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //STARTING CONDITIONS
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');

  //SET ACTIVE TO PLAYER ONE
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //SET WINNER TO NULL
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

init();

//SWITCH PLAYER
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// ROLLING DICE FUNCTIONALITY
const rollDice = function () {
  if (playing) {
    //1. GENERATE A RANDOM DICE ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. DISPLAY THE ROLL
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. CHECK FOR A ROLLED ONE: IF TRUE, SWITCH TO NEXT PLAYER
    if (dice !== 1) {
      //ADD DICE TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //dynamically storing the data based on the active player
    } else {
      //   SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
};

//LISTEN FOR DICE ROLL
btnRoll.addEventListener('click', rollDice);

//LISTEN FOR DICE ROLL
diceEl.addEventListener('click', rollDice);

//LISTEN FOR HOLD
btnHold.addEventListener('click', function () {
  if (playing) {
    //ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //CHECK IF THE PLAYER'S SCORE IS ACTUALLY >= 100
    if (scores[activePlayer] >= 20) {
      //FINISH THE GAME
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //IF NOT, SWITCH
      switchPlayer();
    }
  }
});

//RESETTING THE GAME
btnNew.addEventListener('click', init);
