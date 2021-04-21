import download from '../assets/download.svg';
import './Download.sass';

function Downloads(props) {

  const {areas, coefficient, skewness} = props.positionsObj;

  function makeSVGurl (selector) {
    try {
      const svg = document.querySelector(selector);
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");  
      const svgData = svg.outerHTML;
      const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
      return URL.createObjectURL(svgBlob);  
    } catch {
      alert ('Couldn\'t load the SVGs. Check your browser security settings.');
      window.location.reload();
    }
  }
  
  function makeCSVurl (data) {
    try {
      const csvBlob = new Blob([data], { type:'text/csv;charset=utf-8;'});
      return URL.createObjectURL(csvBlob);
    } catch {
      alert ('Couldn\'t load the CSVs. Check your browser security settings.');
      window.location.reload();
    }
  }
  
  let areasDataStr = '';
  for (let i = 0; i < areas.length; i++) {
    const areaStr = areas[i].toString();
    // if first entry
    if (i === 0) {
      areasDataStr = `areas\n${areaStr}\n`
      continue;
    }
    // if last entry
    if (i === areas.length - 1) {
      areasDataStr = areasDataStr.concat(areaStr);
      break;
    }
    // otherwise
    areasDataStr = areasDataStr.concat(areaStr, '\n');
  }
  
  const diagramURL = makeSVGurl('.diagram-container svg');
  const histogramURL = makeSVGurl('.graph-container svg');
  const areasURL = makeCSVurl(areasDataStr)
  const coefficientURL = makeCSVurl(`coefficient\n${coefficient}`);
  const skewnessURL = makeCSVurl(`skewness\n${skewness}`);
  
  return (
    <div className="downloads-container">
      <div className="row">
        <a download="diagram.svg" href={diagramURL}><img src={download} alt="download diagram" /></a>
        <span>Diagram</span><span>svg</span>
      </div>
      <div className="row">
      <a download="histogram.svg" href={histogramURL}><img src={download} alt="download histogram" /></a>
        <span>Histogram</span><span>svg</span>
      </div>
      <div className="row">
      <a download="areas.csv" href={areasURL}><img src={download} alt="download areas" /></a>
        <span>Areas</span><span>csv</span>
      </div>
      <div className="row">
      <a download="coefficient.csv" href={coefficientURL}><img src={download} alt="download coefficient" /></a>
        <span>Coefficient</span><span>csv</span>
      </div>
      <div className="row">
      <a download="skewness.csv" href={skewnessURL}><img src={download} alt="download skewness" /></a>
        <span>Skewness</span><span>csv</span>
      </div>
    </div>
  )
}

export default Downloads;