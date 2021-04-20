function Information () {

  return (
    <div>
      <h1>Usage</h1>
      <ol>
        <li>
        <span>
          Upload a CSV file of the coordinates. The first record must be a header, and it must contain the field names "x" and "y" exactly.
        </span>
          Download example CSV (github link?)
        </li>
        <li>
          Click on any of the boxes for an expanded view.
        </li>
      </ol>
      <h1>Info</h1>
      <ul>
        <li>Negative coordinates are welcome.</li>
        <li>Cells around the edges are artificially clipped for display, but not for calculations: Infinite cells are not factored into the histogram, skewness, or coefficient.</li>
        <li>The formula for skewness is: where x<sub>i</sub> is the </li>
      </ul>
      <h1>
        Acknowledgements
      </h1>
      <ul>
        <li>
          Big thanks to the D3.js library for the data visualization tools.
        </li>
        <li>
          The formulas for skewness and coefficient come from <a target="_blank" href="https://pubmed.ncbi.nlm.nih.gov/26977812/">this open-access publication</a> in ophthalmology. The app was designed with similar research endeavors in mind.
        </li>
        <li>
          Check out the open-source <a target="_blank" href="https://github.com/hein-j/voronoi-analyzer">Github repo</a>. Issues and pull requests welcome.
        </li>
      </ul>
    </div>
  )
}

export default Information;