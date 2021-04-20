import './Popup.sass';
import {useEffect, useRef} from 'react';
import close from './close.svg';

function Popup (props) {
  const {isOpen, child} = props.obj;
  const popup = useRef(null);

  useEffect(()=> {
    if (isOpen) {
      popup.current.hidden = false;
    } else {
      popup.current.hidden = true;
    }
  })

  return (
    <div hidden ref={popup} id="popup">
      <input className="close-button" type="image" src={close} alt="close" onClick={props.close}></input>
      <div className="popup-window">
        <div className="popup-content-container">
        <div>{child}</div>
        </div>
      </div>
    </div>
  )

}

export default Popup;