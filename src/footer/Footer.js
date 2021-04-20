import './Footer.sass';
import help from './help.svg';
import {csv} from 'd3';
import Information from '../information/Information';
import {useState, useRef} from 'react';

function Footer (props) {

  const [uploadedFile, setUploadedFile] = useState('');

  function handleFile (e) {
    props.closePopup();
    const input = e.target;
    if (!input.files.length) {
      return;
    }
    let file = URL.createObjectURL(input.files[0]);
    setUploadedFile(input.files[0]['name']);
    csv(file).then((data) => {
      URL.revokeObjectURL(file);
      let positions = data.map((obj) => [parseFloat(obj.x), parseFloat(obj.y)]);
      props.positionsCallBack(positions);
    });
  }

  const fileInput = useRef(null);

  function clickFileInput() {
    fileInput.current.click();
  }

  function helpClicked(e) {
    e.preventDefault();
    props.openPopup(<Information />);
  }


  return (
    <div className="footer">
      <input ref={fileInput} id="hidden-file-input" type="file" accept=".csv" onChange={handleFile}/>
      <div id="displayed-file-input">
      <button onClick={clickFileInput}>Upload csv file</button>
      <span>{uploadedFile}</span>
      </div>
      <input id="help-button" type="image" src={help} alt="help" onClick={helpClicked}/>
    </div>
  )

}

export default Footer