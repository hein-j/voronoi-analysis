import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import positionsObj from './positionsObj';
import renderer from 'react-test-renderer';
import Diagram from '../diagram/Diagram';
import Graph from '../graph/Graph';
import Calculations from '../calculations/Calculations';

jest.mock('../downloads/Downloads', () => {return function DummyDownloads(props) {
  return (
    <div data-testid="downloads" />
  );
}})

describe('App', () => {
  test('mounts with correct components', () => {
    render(<App />);
    
    screen.getByTitle('histogram');
    
    screen.getByTitle('diagram');
    
    screen.getByText('Skewness');
    
    screen.getByText('Coefficient');
    
    const calculations = screen.getAllByText((content, element) => {
      return element.tagName.toLowerCase() === 'span' && content.includes('.')
    });
    
    expect(calculations.length).toBe(2);
  });
  
  test('visualizations yield correct pop ups', () => {
    render(<App />);
    userEvent.click(screen.getByTitle('histogram'));
    expect(screen.getAllByTitle('histogram').length).toBe(2);

    userEvent.click(screen.getByTitle('diagram'));
    expect(screen.getAllByTitle('diagram').length).toBe(2);

    userEvent.click(screen.getByText('Skewness'));
    expect(screen.getAllByText('Skewness').length).toBe(2);

    userEvent.click(screen.getByText('Coefficient'));
    expect(screen.getAllByText('Coefficient').length).toBe(2);
  });

  test('footer buttons yield correct pop ups', () => {
    render(<App />);

    userEvent.click(screen.getByRole('button', {
      name: 'download'
    }))

    screen.getByTestId('downloads');

    userEvent.click(screen.getByRole('button', {
      name: 'help'
    }));

    screen.getByText('Usage');
  });

  test('visualizations change correctly on example upload', () => {

    render(<App />);

    const diagram = renderer
      .create(<Diagram positions={positionsObj.positions} apices={positionsObj.apices}/>)
      .toJSON();
      expect(diagram).toMatchSnapshot();

    const graph = renderer
      .create(<Graph areas={positionsObj.areas} />)
      .toJSON();
      expect(graph).toMatchSnapshot();

    const skewness = renderer
      .create(<Calculations name={"Skewness"} value={positionsObj.skewness} />)
      .toJSON();
      expect(skewness).toMatchSnapshot();
    
    const coefficient = renderer
      .create(<Calculations name={"Coefficient"} value={positionsObj.coefficient} />)
      .toJSON();
      expect(coefficient).toMatchSnapshot();
  });

});