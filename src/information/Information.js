import footerDownload from '../assets/footer-download.svg';
import coefficient from '../assets/coefficient.svg';
import skewness from '../assets/skewness.svg';
import './Information.sass';
import download from '../assets/download.svg';
import exampleCSV from '../assets/voronoi-analyzer-example.csv';

function Information () {

  // formulae formatted through Mathcha - https://www.mathcha.io/ 

  return (
    <div className="information">
      <h1>Usage</h1>
      <ol>
        <li className="upload-instructions">
        <span>
          Upload a CSV file of the coordinates. The first record must be a header, and it must contain the field names "x" and "y" exactly.
        </span>
        <span>
          <a href={exampleCSV} download="voronoi-analyzer-example"><img className="icon" src={download} alt="download example csv"/></a>Download example CSV
        </span>
        </li>
        <li>
          Click on any of the boxes for an expanded view.
        </li>
        <li>
          Download the visuals and the related data using the <img className="icon" src={footerDownload} alt="download" /> button in the footer.
        </li>
      </ol>
      <h1>Info</h1>
      <ul>
        <li>Welcome to Voronoi Analyzer, an app that generates the <a href="https://en.wikipedia.org/wiki/Voronoi_diagram" target="_blank" rel="noreferrer">Voronoi diagram</a> of a given set of coordinates and performs statistical analysis on the areas of the resulting polygons. You can use it, for instance, to examine the density of cells, nuclei, etc. in micrographs. It is not, however, intended to substitute the likes of MATLAB.</li>
        <li>Cells around the edges are artificially clipped for display, but not for calculations: Infinite cells are not factored into the histogram, skewness, or coefficient.</li>
        <li>Negative coordinates are welcome.</li>
        <li className="formula-li">
          <span>The formula for quantifying skewness is:</span>
          <img src={skewness} alt="g\index{i}=\frac{\frac{1|n} \sum{n|i=1} (x\index{i} - \overline{x})\power{3}|(\frac{1|n} \sum{n|i=1} (x\index{i} - \overline{x})\power{2})\power{3/2}}" />
          <span>where x<sub>i</sub> is the area of the i<sup>th</sup> domain and x̄ is the sample mean.<span className="asterisk"> *</span></span>
        </li>
        <li className="formula-li">
          <span>The coefficient of clustering is determined by the ratio between the global coefficient of variance and the average local coefficient of variance in domain sizes. The formula is:</span>
          <img src={coefficient} alt="c=\frac{n\overline{x}|𝜎\index{x} \sum{n|i=1} \frac{\overline{a\index{i}}|𝜎\index{a\index{i}}} }"/>
          <span>where σ<sub>x</sub> is the standard deviation of all the domains, and ā and σ<sub>a<sub>i</sub></sub> are the mean and the standard deviation of the size of neighboring domains of i<sup>th</sup> domain, respectively.<span className="asterisk"> *</span></span>
        </li>
        <li>
          Check out the open source <a target="_blank" rel="noreferrer" href="https://github.com/hein-j/voronoi-analyzer">Github repo</a>. Issues and pull requests welcome.
        </li>
      </ul>
      <h1>
        Acknowledgements
      </h1>
      <ul>
        <li>
          Big thanks to the <a href="https://d3js.org" rel="noreferrer" target="_blank">D3.js</a> library for the data visualization tools.
        </li>
        <li>
          <span className="asterisk">*</span> — The formulae for skewness and coefficient come from <a target="_blank" rel="noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/26977812/">this open-access publication</a> in ophthalmology.
        </li>
        <li>
          More citations can be found in the source code itself.
        </li>
      </ul>
    </div>
  )
}

export default Information;