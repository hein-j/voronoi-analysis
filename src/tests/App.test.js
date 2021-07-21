import { render, screen } from '@testing-library/react';
import App from '../App';


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


