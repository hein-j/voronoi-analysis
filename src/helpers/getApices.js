function getApices (positions) {
  // find both max and min of both x and y
  const apices = positions.reduce((apices, curr) => {
    const x = curr[0];
    const y = curr[1];
    return {
      min: [
        Math.min(x, apices.min[0]),
        Math.min(y, apices.min[1])
      ],
      max: [
        Math.max(x, apices.max[0]),
        Math.max(y, apices.max[1])
      ]
    }
  },
  {
    min: [Infinity,Infinity],
    max: [-Infinity, -Infinity]
  });
  return apices;
}

export default getApices;