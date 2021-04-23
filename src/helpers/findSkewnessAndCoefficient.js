import {std} from 'mathjs';

function findSkewnessAndCoefficient(areasInfo, voronoi, isFinite) {
  const {areasObjs, areas, totalArea} = areasInfo;
  const n = areasObjs.length;
  const meanArea = totalArea / n;
  
  // accumulators for skewness
  let skewnessTopSigma = 0;
  let skewnessBottomSigma = 0;
  
  // accumulators for coefficient
  // we need separate totalArea and areas array for coefficient because we are filtering out domains with only one finite neighbor
  let coefficientSigma = 0;
  let filTotalArea = 0;
  let filAreas = [];

  
  // calculate the sigmas
  for (let i=0; i < n; i++) {
    // skewness
    const diff = areasObjs[i].area - meanArea;
    skewnessTopSigma += Math.pow(diff, 3);
    skewnessBottomSigma += Math.pow(diff, 2);
  
    // coefficient
    // find only neighbors with finite areas
    const neighbors = [...voronoi.neighbors(areasObjs[i].voronoiIndex)].filter((index) => isFinite[index] === true);
    // if there is only 1 finite neighbor, do not factor into coefficient
    if (neighbors.length <= 1) {
      continue;
    }
    filTotalArea += areasObjs[i].area;
    filAreas.push(areasObjs[i].area);
    let areasOfNeighbors = [];
    let totalAreaOfNeighbors = 0;
    neighbors.forEach((voronoiIndex) => {
      const area = areasObjs.find((area) => area.voronoiIndex === voronoiIndex).area;
      areasOfNeighbors.push(area);
      totalAreaOfNeighbors+= area;
    })
    const avgAreaOfNeighbors = totalAreaOfNeighbors / neighbors.length;
    let stdOfAreasOfNeighbors = std(areasOfNeighbors);
    coefficientSigma += (avgAreaOfNeighbors / stdOfAreasOfNeighbors);
  }
  
  // continue skewness calculation
  const skewnessNumerator = skewnessTopSigma * (1 / n);
  const skewnessDenominator = Math.pow( (skewnessBottomSigma * (1 / n)) , (3 / 2) );
  const skewness = skewnessNumerator / skewnessDenominator;
  
  // continue coefficient calculation
  if (filAreas.length === 1) {
    return {skewness, coefficient: "error"}
  }
  const coefficientNumerator = filTotalArea;
  const coefficientDenominator = std(filAreas) * coefficientSigma;
  const coefficient = coefficientNumerator / coefficientDenominator;

  return {
    skewness,
    coefficient
  }
}

export default findSkewnessAndCoefficient