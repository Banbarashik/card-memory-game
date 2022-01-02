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

const positions = [];

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

console.log(positions);
setGridCells(5, 4);

console.log(cards);
