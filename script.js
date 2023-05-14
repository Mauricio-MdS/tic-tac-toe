/* eslint-disable no-param-reassign */

(() => {
  const availableMoves = [];
  let isXTurn;
  const playButtons = document.querySelectorAll('.play');
  const WINNING_LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal lines
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical lines
    [0, 4, 8], [2, 4, 6]]; // diagonal lines

  function gameOver(winner) {
    playButtons.forEach((button) => {
      button.disabled = true;
    });
    if (winner === 'draw') alert('It is a draw');
    else alert(`${winner} won!`);
  }

  function checkGameOver() {
    let winner;
    WINNING_LINES.forEach((line) => {
      const lineContent = [
        playButtons[line[0]].textContent,
        playButtons[line[1]].textContent,
        playButtons[line[2]].textContent];
      if (lineContent[0] && lineContent.every((value) => value === lineContent[0])) {
        [winner] = lineContent;
      }
    });
    if (winner) return winner;
    if (availableMoves.length === 0) return 'draw';
    return false;
  }

  function registerMove(buttonNumber, marker) {
    playButtons[buttonNumber].textContent = marker;
    playButtons[buttonNumber].disabled = true;
    const moveIndex = availableMoves.findIndex((move) => move === buttonNumber);
    availableMoves.splice(moveIndex, 1);
    isXTurn = !isXTurn;
  }

  function computerMove() {
    const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    playRound(move, 'O');
  }

  function playRound(fieldNumber, symbol) {
    registerMove(fieldNumber, symbol);
    const overCondition = checkGameOver();
    if (overCondition) gameOver(overCondition);
    else if (!isXTurn) computerMove();
  }

  function bindListeners() {
    playButtons.forEach((button) => {
      button.addEventListener('click', (event) => playRound(Number(event.target.dataset.number), 'X'));
    });
  }

  function initializeVariables() {
    for (let i = 0; i < 9; i += 1) {
      availableMoves.push(i);
    }
    isXTurn = true;
  }

  function init() {
    bindListeners();
    initializeVariables();
  }

  init();
})();
