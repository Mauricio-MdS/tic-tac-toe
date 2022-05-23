import React from "react";
import Board from "../Board/Board";
import Info from "../Info/Info";
import './Game.css';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      history : [ {
        move: null,
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const move = i;
    const squares = current.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        move: move,
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  squareToColRow(i){
    switch (i){
      case 0:
        return '(1, 1)';
      case 1:
        return '(1, 2)';
      case 2:
        return '(1, 3)';
      case 3:
        return '(2, 1)';
      case 4:
        return '(2, 2)';
      case 5:
        return '(2, 3)';
      case 6:
        return '(3, 1)';
      case 7:
        return '(3, 2)';
      case 8:
        return '(3, 3)';
      default:
        throw Error('unexpected value');
    }
  }

  showMove(numberOfMoves, squareMoved){
    return `Go to move #${numberOfMoves},
      ${(numberOfMoves % 2) === 0 ? 'O' : 'X'} in
      ${this.squareToColRow(squareMoved)}`; 
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map( (step, move) => {
      const description = move ?
        this.showMove(move, step.move):
        'Go to game start';
      return (
        <li key = {move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });


    let status;
    if (winner) {
      status= 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }


    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <Info status = {status} moves = {moves}/>
      </div>
    );
  }
}