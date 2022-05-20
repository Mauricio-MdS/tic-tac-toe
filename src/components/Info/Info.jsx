import './Info.css';

export default function Info(props){
  
  const {status, moves} = props;

  return(
    <div className = 'game-info'>
          <div className = 'status'>{status}</div>
          <ol>{moves}</ol>
    </div>
  );
  
}