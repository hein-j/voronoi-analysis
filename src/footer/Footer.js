import './Footer.sass';
import help from '../assets/help.svg';
import {csv} from 'd3';
import Information from '../information/Information';
import footerDownload from '../assets/footer-download.svg';
import {useState, useRef} from 'react';
import Downloads from '../downloads/Downloads';

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

  function buttonClicked(e) {
    e.preventDefault();
    let child = <Downloads />;
    if (e.target.alt === 'help') {
      child = <Information />
    }
    props.openPopup(child);
  }

  return (
    <div className="footer">
      <input ref={fileInput} id="hidden-file-input" type="file" accept=".csv" onChange={handleFile}/>
      <div id="displayed-file-input">
        <button onClick={clickFileInput}>Upload csv file</button>
        <span>{uploadedFile}</span>
      </div>
      <input id="download-button" type="image" src={footerDownload} alt="download" onClick={buttonClicked}/>
      <input id="help-button" type="image" src={help} alt="help" onClick={buttonClicked}/>
    </div>
  )

}

export default Footer