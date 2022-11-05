import { render } from '@testing-library/react';
import App from './App';

describe('app-root layout', () => {
  render(<App />);

  test('renders app header', () => {
    const header = document.querySelector("header");
    expect(header).toBeInTheDocument();
  });
});
