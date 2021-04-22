import {std} from 'mathjs';

function findSkewnessAndCoefficient(areasInfo, voronoi, isFinite) {
  const {areasObjs, areas, totalArea} = areasInfo;
  const n = areasObjs.length;
  const meanArea = totalArea / n;
  
  // accumulators for skewness
  let skewnessTopSigma = 0;
  let skewnessBottomSigma = 0;
  
  // accumulators for coefficient
  let coefficientSigma = 0;

  let previousNonZeroStdOfAreasOfNeighbors = 1;
  
  // calculate the sigmas
  for (let i=0; i < n; i++) {
    // skewness
    const diff = areasObjs[i].area - meanArea;
    skewnessTopSigma += Math.pow(diff, 3);
    skewnessBottomSigma += Math.pow(diff, 2);
  
    // coefficient
    // find only neighbors with finite areas
    const neighbors = [...voronoi.neighbors(areasObjs[i].voronoiIndex)].filter((index) => isFinite[index] === true);
    let areasOfNeighbors = [];
    let totalAreaOfNeighbors = 0;
    neighbors.forEach((voronoiIndex) => {
      const area = areasObjs.find((area) => area.voronoiIndex === voronoiIndex).area;
      areasOfNeighbors.push(area);
      totalAreaOfNeighbors+= area;
    })
    const avgAreaOfNeighbors = totalAreaOfNeighbors / neighbors.length;
    let stdOfAreasOfNeighbors = std(areasOfNeighbors);
    // if there is only one finite neighbor
    if (stdOfAreasOfNeighbors === 0) {
      stdOfAreasOfNeighbors = previousNonZeroStdOfAreasOfNeighbors;
    }
    previousNonZeroStdOfAreasOfNeighbors = stdOfAreasOfNeighbors;
    coefficientSigma += (avgAreaOfNeighbors / stdOfAreasOfNeighbors);
  }
  
  // continue skewness calculation
  const skewnessNumerator = skewnessTopSigma * (1 / n);
  const skewnessDenominator = Math.pow( (skewnessBottomSigma * (1 / n)) , (3 / 2) );
  const skewness = skewnessNumerator / skewnessDenominator;
  
  // continue coefficient calculation
  const coefficientNumerator = n * meanArea;
  const coefficientDenominator = std(areas) * coefficientSigma;
  const coefficient = coefficientNumerator / coefficientDenominator;

  return {
    skewness,
    coefficient
  }
}

export default findSkewnessAndCoefficient