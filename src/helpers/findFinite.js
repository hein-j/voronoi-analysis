function findFinite(voronoi) {
  // determine which indexes are finite
  const vectors = voronoi.vectors;
  let isFinite = [];

  for (let i = 0; i < vectors.length; i+= 4) {
    if (vectors[i] === 0 && vectors[i + 1] === 0) {
      isFinite.push(true);
      continue;
    }
    isFinite.push(false);
  }

  return isFinite;
}

export default findFinite;