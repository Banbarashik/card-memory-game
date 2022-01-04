'use strict';
// DOM elements into variables
const gameField = document.getElementById('game--field');
const cards = document.getElementsByClassName('card');

const positions = [];
const checkedCards = [];

// Generated DOM elements
const winMessage = document.createElement('p');
winMessage.textContent = 'You won! Wanna play again?';

const btnNewGame = document.createElement('button');
btnNewGame.textContent = 'Start new game';

const setGameField = function (e, columns = 5, rows = 4) {
  gameField.classList.remove('game-end-screen');
  if (winMessage.parentElement === gameField) gameField.removeChild(winMessage);
  if (btnNewGame.parentElement === gameField) gameField.removeChild(btnNewGame);

  gameField.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  fillGridCells(columns, rows);
};

const fillGridCells = function (columns, rows) {
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement('div');

    cell.classList.add('card', 'hidden');

    gameField.appendChild(cell);
  }

  addCardsEvents();
  setCardsPairClasses();
  placeCardsRandomly(columns, rows);
};

const addCardsEvents = function () {
  for (const card of cards) card.addEventListener('click', makeCardVisible);
};

// Connecting pairs of cards by a 'pair-i' class
const setCardsPairClasses = function () {
  let i = 1;
  Array.from(cards).forEach((card, index) => {
    if (index % 2 === 0) {
      card.classList.add(`pair-${i}`);
      i++;
    } else {
      card.classList.add(`pair-${i - 1}`);
    }
  });
};

const generateRandomPositions = function (arr, columns, rows) {
  for (let i = 0; i < columns * rows; i++) {
    const columnStart = Math.floor(Math.random() * columns) + 1;
    const rowStart = Math.floor(Math.random() * rows) + 1;

    if (arr.indexOf(`${columnStart},${rowStart}`) === -1)
      arr.push(`${columnStart},${rowStart}`);
    else i--;
  }
};

// randomly place cards in the grid
const placeCardsRandomly = function (columns, rows) {
  generateRandomPositions(positions, columns, rows);

  Array.from(cards).forEach((card, index) => {
    card.style.gridColumnStart = positions[index].split(',')[0];
    card.style.gridRowStart = positions[index].split(',')[1];
  });
};

const resetIfNoPair = function () {
  checkedCards.forEach(card => {
    card.classList.remove('visible');
    card.classList.add('hidden');
  });

  checkedCards.length = 0;

  Array.from(cards).forEach(card => (card.style.pointerEvents = ''));
};

const checkIfPair = function () {
  if (
    checkedCards.length === 2 &&
    checkedCards[0].classList.value !== checkedCards[1].classList.value
  ) {
    Array.from(cards).forEach(card => (card.style.pointerEvents = 'none')); // disable all cards while the timeout function didn't execute

    setTimeout(resetIfNoPair, 1000);
  } else if (checkedCards.length === 2) {
    checkedCards.forEach(card =>
      card.removeEventListener('click', makeCardVisible)
    );

    checkedCards.length = 0;
  }
};

const makeCardVisible = function (event) {
  checkedCards.push(event.target);
  event.target.classList.add('visible');
  event.target.classList.remove('hidden');

  checkIfPair();
  if (checkIfGameEnd()) gameEnd();
};

const checkIfGameEnd = function () {
  let checker = true;

  for (const card of cards) {
    if (card.classList.contains('visible')) continue;
    else checker = false;
  }

  return checker;
};

const gameEnd = function () {
  gameField.replaceChildren();

  positions.length = 0;

  gameField.classList.add('game-end-screen');

  gameField.appendChild(winMessage);
  gameField.appendChild(btnNewGame);
};

setGameField(5, 4);

btnNewGame.addEventListener('click', setGameField);
