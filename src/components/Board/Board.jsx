import Square from "../Square/Square";
import './Board.css';

export default function Board(props) {

  function renderLine(line) {
    const squares = [];
    for (let i = 0; i < 3; i++){
      const squareNumber = 3*line + i;
      squares.push(
        <Square
          key = {squareNumber}
          value={props.squares[squareNumber]}
          onClick={() => props.onClick(squareNumber)}
        />
      )
    }
    return squares;
  }

  const listLines = [];

  for (let i = 0; i < 3; i++){
    listLines.push(renderLine(i));
  }

  const lines = listLines.map((line, index) => (
    <div key={index} className="board-row">
      {line}
    </div>
  ));

  return (
      <div>
        {lines}
      </div>
  );
}