import './App.sass';
import Footer from './footer/Footer';
import {useState, useEffect} from 'react';
import getInitialPositions from './helpers/getInitialPositions';
import getApices from './helpers/getApices';
import {Delaunay} from 'd3';
import findFinite from './helpers/findFinite';
import getAreaInfo from './helpers/getAreaInfo';
import findSkewnessAndCoefficient from './helpers/findSkewnessAndCoefficient';
import Graph from './graph/Graph';
import Diagram from './diagram/Diagram';
import Calculations from './calculations/Calculations';
import Popup from './popup/Popup';
import { e } from 'mathjs';

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

  const [popupObj, setPopupObj] = useState({
    isOpen:false,
    child: <div></div>
  })

  function openPopup (child) {
    setPopupObj({
      isOpen: true,
      child: child
    })
  }

  function closePopup () {
    setPopupObj({
      isOpen: false,
      child: <div></div>
    })
  }


  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key !== 'Escape') {
        return;
      }
      closePopup();
    })
  }, [])

  const DiagramComp = <Diagram positions={positionsObj.positions} apices={positionsObj.apices}/>;
  const SkewnessComp = <Calculations name={"Skewness"} value={positionsObj.skewness} />;
  const CoefficientComp = <Calculations name={"Coefficient"} value={positionsObj.coefficient} />;
  const GraphComp = <Graph areas={positionsObj.areas} />;

  return (
    <div className="container">
      <Popup obj={popupObj} close={closePopup} />
      <div className="centered-container">
        <div className="cell" onClick={() => openPopup(DiagramComp)}>
          {DiagramComp}
        </div>
        <div className="cell" onClick={() => openPopup(SkewnessComp)}>
          {SkewnessComp}
        </div>
        <div className="cell" onClick={() => openPopup(CoefficientComp)}>
          {CoefficientComp}
        </div>
        <div className="cell" onClick={() => openPopup(GraphComp)}>
          {GraphComp}
        </div>
      </div>
      <Footer positionsCallBack={changePositions} openPopup={openPopup} closePopup={closePopup}/>
    </div>
  );
}

export default App;
