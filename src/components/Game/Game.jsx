import React, { useState } from "react";
import calculateWinner from "../../common/calculateWinner/calculateWinner";
import Board from "../Board/Board";
import Info from "../Info/Info";
import './Game.css';

export default function Game() {

  const [history, setHistory] = useState([{
    move: null,
    squares: Array(9).fill(null)
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const slicedHistory = history.slice(0, stepNumber + 1);
    const current = slicedHistory[slicedHistory.length - 1];
    const move = i;
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      slicedHistory.concat([{
      move: move,
      squares: squares}])
    );
    setStepNumber(slicedHistory.length);
    setXIsNext(!xIsNext);
  }

    const current = history[stepNumber];

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => handleClick(i)}
          />
        </div>
        <Info 
          history = {history}
          stepNumber = {stepNumber}
          setStepNumber = {setStepNumber}
          xIsNext = {xIsNext}
          setXIsNext = {setXIsNext}
        />
      </div>
    );
  }