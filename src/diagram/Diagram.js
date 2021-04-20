import * as d3 from "d3";
import {useEffect} from "react";
import './Diagram.sass';

function Diagram (props) {

  const {positions, apices} = props;

  let renderPositions = [...positions];
  let renderMaxes = [apices.max[0], apices.max[1]];

  // shift if minimums fall in the negative
  if (apices.min[0] < 0 || apices.min[1] < 0) {
    let xShift = 0;
    let yShift = 0;
    if (apices.min[0] < 0) {
      xShift = -1 * apices.min[0];
    }
    if (apices.min[1] < 0) {
      yShift = -1 * apices.min[1];
    }
    renderPositions = renderPositions.map((position) => {
      return [
        (position[0] + xShift),
        (position[1] + yShift)
      ]
    });
    renderMaxes = [renderMaxes[0] + xShift, renderMaxes[1] + yShift];
  }


  // find max between x and y maxes
  const renderMax = Math.max(renderMaxes[0], renderMaxes[1]);

  // find factor to enlarge or shrink by
  const width = 1000;
  const height = 1000;
  const factor = width / renderMax;

  renderPositions = renderPositions.map((position) => {
    return [
      position[0] * factor,
      position[1] * factor
    ]
  });

  // have first three positions in beginning of animation
  let tempPositions = renderPositions.slice(0,3);

  useEffect(renderDiagram, [positions, apices]);
  
  function renderDiagram () {
    // big help from https://observablehq.com/@d3/circle-dragging-iii?collection=@d3/d3-delaunayv
  
    document.querySelector(".diagram-container").innerHTML = '';
  
    const svg = d3.select(".diagram-container")
    .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("stroke-width", 2);
    
    let voronoi = d3.Delaunay
      .from(tempPositions)
      .voronoi([0, 0, width, height]);
  
    const circle = svg.append("g")
      .selectAll("circle")
      .data(renderPositions)
      .join("circle")
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 1)
        .attr("fill", "black");
  
    const mesh = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("d", voronoi.render());
  
    function update(tempPositions) {
      const voronoi = d3.Delaunay.from(tempPositions).voronoi([0, 0, width, height]);
      mesh.attr("d", voronoi.render());
    }
  
    for (let i = 0 ; i < renderPositions.length; i++) {
      // skip if initial first three positions
      if (i < 3) {
        continue;
      }
      setTimeout(()=> {
        tempPositions.push(renderPositions[i]);
        update(tempPositions)
      },i * 2)
    }
  }

  return (
    <div className="diagram-container"></div>
  )
}

export default Diagram;