// src/__tests__/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock the canvas context, since JSDOM doesn't have it
HTMLCanvasElement.prototype.getContext = () => null;

describe('<App />', () => {
  it('should render the start screen initially', () => {
    render(<App />);
    expect(screen.getByText('Somnia Runner')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('should transition to the game canvas when start is clicked', () => {
    render(<App />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // The start screen should be gone
    expect(screen.queryByText('Somnia Runner')).not.toBeInTheDocument();
    
    // A simple way to check if the game is running is to see if the canvas is there.
    // Since we can't inspect canvas content easily, we just check for its existence.
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });
  
  // Note: Testing the full game loop, pause, and game over state transitions
  // would be more complex and fall into the category of end-to-end testing.
  // These tests provide a basic check that the initial state and transitions work.
});
