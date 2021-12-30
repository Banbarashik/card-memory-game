'use strict';
// DOM elements into variables
const gameField = document.getElementById('game--field');

const setGridCells = function (columns, rows) {
  gameField.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  gameField.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  fillGridCells(columns, rows);
};

const fillGridCells = function (columns, rows) {
  for (let i = 0; i < columns * rows; i++) {
    const cell = document.createElement('div');

    gameField.appendChild(cell);
  }
};
