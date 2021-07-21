import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Downloads from '../downloads/Downloads';

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


  

})