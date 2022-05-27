import './Toggle.css';

export default function Toggle(props){
  const {disabled, invertedMoves, setInvertedMoves} = props;
  return(
    <label className="switch">
      <input
        type="checkbox"
        disabled={disabled}
        checked={invertedMoves}
        onChange={() => setInvertedMoves(!invertedMoves)}
      />
      <span className="slider round"></span>
    </label>
  )

}