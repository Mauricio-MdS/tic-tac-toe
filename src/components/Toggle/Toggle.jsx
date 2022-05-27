import './Toggle.css';

export default function Toggle(props){
  const {disabled} = props;
  return(
    <label className="switch">
      <input type="checkbox" disabled={disabled}/>
      <span className="slider round"></span>
    </label>
  )

}