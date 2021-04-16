import './Footer.sass';
import help from './help.svg';
import {csv} from 'd3';

function Footer (props) {

  function handleFile (e) {
    const input = e.target;
    if (!input.files.length) {
      return;
    }
    let file = URL.createObjectURL(input.files[0]);
    csv(file).then((data) => {
      URL.revokeObjectURL(file);
      let positions = data.map((obj) => [parseFloat(obj.x), parseFloat(obj.y)]);
      props.callBack(positions);
    });
  }


  return (
    <div className="footer">
      <div className="footer-content">
      <input id="file-input" type="file" accept=".csv" onChange={handleFile} />
      <input id="help-button" type="image" src={help} alt="help" />
      </div>
    </div>
  )

}

export default Footer