function getInitialPositions () {
  let positions = [];
  for (let i = 0; i < 20; i++) {
    const factor = 10;
    let x = Math.random() * factor;
    let y = Math.random() * factor;
    let coordinates = [x,y]
    positions.push(coordinates)
  }
  return positions;
}

export default getInitialPositions