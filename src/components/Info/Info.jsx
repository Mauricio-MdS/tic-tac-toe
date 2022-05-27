import calculateWinner from '../../common/calculateWinner/calculateWinner';
import Toggle from '../Toggle/Toggle';
import './Info.css';

export default function Info(props){

  const { history, stepNumber, xIsNext, setStepNumber, setXIsNext } = props;
  
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map( (step, move) => {
    const description = move ?
      showMove(move, step.move):
        'Go to game start';
      return (
        <li key = {move}>
          <button 
            className={step === current ? 'current' : ''}
            onClick={() => jumpTo(move)}
          >
            {description}
          </button>
        </li>
      );
    });


  let status;
    if (winner) {
      status= 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  function showMove(numberOfMoves, squareMoved){
    return `Go to move #${numberOfMoves},
      ${(numberOfMoves % 2) === 0 ? 'O' : 'X'} in
      ${squareToColRow(squareMoved)}`; 
  }

  function squareToColRow(i){
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

  return(
    <div className = 'game-info'>
          <div className = 'status'>
            {status}
            <Toggle disabled={moves.length < 2}/>
            Toggle move order
          </div>
          <ol>{moves}</ol>
    </div>
  );
  
}