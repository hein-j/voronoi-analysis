// adapted from https://www.mathopenref.com/coordpolygonarea2.html
function polygonArea(X, Y, numPoints) {
  // accumulates area
  let area = 0;
  let j = numPoints - 1;
  for (let i = 0 ; i < numPoints ; i++) {
    area += (X[j]+X[i]) * (Y[j]-Y[i]);
    // j is previous vertex to i
    j = i; 
  }
  // return a positive value, even when accumulating counter-clockwise
  return Math.abs(area / 2);
}

function getAreaInfo(voronoi, isFinite) {
  let areasObjs = [];
  let areas = [];
  let totalArea = 0;
  const polygons = [...voronoi.cellPolygons()];

  for (let i = 0; i < isFinite.length; i++) {
    // find areas only for finite cells
    if (isFinite[i] === true) {
      let polygon = polygons[i]
      // slice off last point, which repeats the very first one
      polygon.pop();
      const X = polygon.map(vertex => vertex[0]);
      const Y = polygon.map(vertex => vertex[1]);
      const area = polygonArea(X, Y, polygon.length);
      areasObjs.push(
        {
          area: area,
          voronoiIndex: i
        }
      )
      areas.push(area)
      totalArea+= area;
    }
  }

  return {
    areasObjs,
    areas,
    totalArea
  }
}

export default getAreaInfo;