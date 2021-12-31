'use strict';
// DOM elements into variables
const gameField = document.getElementById('game--field');
const cards = document.getElementsByClassName('card');

const setGridCells = function (columns, rows) {
  gameField.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  fillGridCells(columns, rows);
};

const fillGridCells = function (columns, rows) {
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement('div');

    cell.classList.add('card');

    gameField.appendChild(cell);
  }

  setCardsPairClasses();
  placeCardsRandomly(columns, rows);
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

// randomly place cards in the grid
const placeCardsRandomly = function (columns, rows) {
  Array.from(cards).forEach(card => {
    card.style.gridColumnStart = Math.floor(Math.random() * columns) + 1;
    card.style.gridRowStart = Math.floor(Math.random() * rows) + 1;
  });
};

setGridCells(6, 6);

console.log(cards);
