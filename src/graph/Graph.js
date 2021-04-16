import * as d3 from "d3";
import {useEffect} from "react";


function Graph (props) {

  const {areas} = props;

  // create intervals along x-axis

  const maxArea = areas.reduce((max, curr) => {
    return Math.max(max, curr)
    }, 0)
  const numberOfAreas = areas.length;
  const barsDesired = Math.min(numberOfAreas, 100);
  const intervalSpacing = maxArea / barsDesired;
  let data = [];
  let startPt = 0;
  for (let i = 0; i < barsDesired; i++) {
    let next = startPt + intervalSpacing;
    data.push({
      interval: [startPt, next],
      areas: [],
      percentage: 0,
      startPt: 1 * startPt.toFixed(3)
    });
    startPt = next;
  }

  // Determine the percentage to show along the y-axis and the max value

  for (let area of areas) {
    for (let obj of data) {
      const interval = obj.interval;
      if (area >= interval[0] && area <= interval[1]) {
        obj.areas.push(area);
        break;
      }
    }
  }
  
  let maxPercentage = 0;
  
  data.forEach(obj => {
    obj.percentage = (obj.areas.length / numberOfAreas) * 100;
    maxPercentage = Math.max(maxPercentage, obj.percentage);
  });

  
  useEffect(() => {
    // big help from https://www.d3-graph-gallery.com/graph/barplot_animation_start.html 
    // help with labels from https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e 
    
    const color = "#69b3a2";
    
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 90, left: 70};
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    document.getElementById("graph-container").innerHTML = '';

  // append the svg object to the body of the page
  const svg = d3.select("#graph-container")
    .append("svg")
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
      .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
  
    // X axis
    const x = d3.scaleLinear()
      .range([ 0, width ])
      .domain([0, maxArea])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // text label for the x axis
    svg.append("text")             
    .attr("transform",
          "translate(" + (width/2) + " ," + 
                          (height + margin.top + 50) + ")")
    .style("text-anchor", "middle")
    .text("Area");
    
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, maxPercentage])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
    
    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Percentage of cells");
    
    // Bars
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.startPt); })
        .attr("width", (width / barsDesired) - 1)
        .attr("fill", color)
        // no bar at the beginning thus:
        .attr("height", function(d) { return height - y(0); }) // always equal to 0
        .attr("y", function(d) { return y(0); })
    
    // Animation
    svg.selectAll("rect")
      .transition()
      .duration(800)
      .attr("y", function(d) { return y(d.percentage); })
      .attr("height", function(d) { return height - y(d.percentage); })
      .delay(function(d,i){return(i*50)})
  });

  return (
    <div id="graph-container"></div>
  )
}

export default Graph;