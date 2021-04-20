import download from '../assets/download.svg';
import './Download.sass';

function Downloads(props) {

  const {areas, coefficient, skewness} = props.positionsObj;

  function makeSVGurl (selector) {
    const svg = document.querySelector(selector);
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");  
    const svgData = svg.outerHTML;
    const svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
    return URL.createObjectURL(svgBlob);  
  }

  const diagramURL = makeSVGurl('.diagram-container svg');
  const histogramURL = makeSVGurl('.graph-container svg');

  function makeCSVurl (data) {
    const csvBlob = new Blob([data], { type:'text/csv;charset=utf-8;'});
    return URL.createObjectURL(csvBlob);
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
  
  const areasURL = makeCSVurl(areasDataStr)

  const coefficientURL = makeCSVurl(`coefficient\n${coefficient}`);
  const skewnessURL = makeCSVurl(`skewness\n${skewness}`);

  return (
    <div className="downloads-container">
      <div className="row">
        <a download="diagram" href={diagramURL}><img src={download} alt="download diagram" /></a>
        <span>Diagram (svg)</span>
      </div>
      <div className="row">
      <a download="histogram" href={histogramURL}><img src={download} alt="download histogram" /></a>
        <span>Histogram (svg)</span>
      </div>
      <div className="row">
      <a download="areas" href={areasURL}><img src={download} alt="download areas" /></a>
        <span>Areas (csv)</span>
      </div>
      <div className="row">
      <a download="coefficient" href={coefficientURL}><img src={download} alt="download coefficient" /></a>
        <span>Coefficient (csv)</span>
      </div>
      <div className="row">
      <a download="skewness" href={skewnessURL}><img src={download} alt="download skewness" /></a>
        <span>Skewness (csv)</span>
      </div>
    </div>
  )
}

export default Downloads;