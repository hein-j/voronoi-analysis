import CountUp from 'react-countup';

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
    <div>
      <div>{name}</div>
      <CountUp
        start={0}
        end={value}
        duration={7}
        decimals={decimals}
        onEnd={() => console.log('flash')}
        />
    </div>
  )
}

export default Calculations;