import CountUp from 'react-countup';
import './Calculations.sass';

function Calculations (props) {
  const {name, value} = props;

  function countDecimals (value) {
    const arrays = value.toString().split('.');
    if (arrays.length === 1) {
      return 0
    }
    return arrays[1].length;
  }

  const decimals = countDecimals(value);

  return (
    <div className="calculations-container">
      <span className="value-name">{name}</span>
      <CountUp className="value"
        start={0}
        end={value}
        duration={1}
        decimals={decimals}
        />
    </div>
  )
}

export default Calculations;