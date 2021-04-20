function getInitialPositions () {
  let positions = [];

  function populatePositions(num, factor, shift) {
    for (let i = 0; i < num; i++) {
      let x = (Math.random() * factor) + shift;
      let y = (Math.random() * factor) + shift;
      let coordinates = [x,y];
      positions.push(coordinates);
    }
  }

  populatePositions(30, 100, 450);
  populatePositions(400, 1000, 0);

  return positions;
}

export default getInitialPositions