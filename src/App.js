import './App.sass';
import Footer from './footer/Footer';
import {useState} from 'react';
import getInitialPositions from './helpers/getInitialPositions';
import getApices from './helpers/getApices';
import {Delaunay} from 'd3';
import findFinite from './helpers/findFinite';
import getAreaInfo from './helpers/getAreaInfo';
import findSkewnessAndCoefficient from './helpers/findSkewnessAndCoefficient';
import Coefficient from './coefficient/Coefficient';
import Graph from './graph/Graph';
import Diagram from './diagram/Diagram';
import Skewness from './skewness/Skewness';


function App() {
  
  function processPositions(positions) {
    const apices = getApices(positions);
    // initiate voronoi
    const buffer = 100;
    const voronoi = Delaunay.from(positions).voronoi([apices.min[0] - buffer, apices.min[1] - buffer, apices.max[0] + buffer, apices.max[1] + buffer]);
    const isFinite = findFinite(voronoi);
    const areasInfo = getAreaInfo(voronoi, isFinite);
    const {skewness, coefficient} = findSkewnessAndCoefficient(areasInfo, voronoi, isFinite);
    return {
      positions: positions,
      apices: apices,
      areas: areasInfo.areas,
      skewness: skewness,
      coefficient: coefficient
    }
  }

  function changePositions(positions) {
    const newObj = processPositions(positions);
    setPositionsObj(newObj);
  }
  
  const [positionsObj, setPositionsObj] = useState(processPositions(getInitialPositions()));

  return (
    <div className="container">
      <div className="centered-container">
        <Diagram positions={positionsObj.positions} apices={positionsObj.apices} />
        <Skewness skewness={positionsObj.skewness} />
        <Coefficient coefficient={positionsObj.coefficient} />
        <Graph areas={positionsObj.areas} />
      </div>
      <Footer callBack={changePositions} />
    </div>
  );
}

export default App;
