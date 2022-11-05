import { render, screen } from '@testing-library/react';
import App from './App';

describe('app layout', () => {

  test('renders header with logo and theme button', () => {
    render(<App />);
    const header = document.querySelector('header');
    expect(header).toBeInTheDocument();
    const logo = header.querySelector('h1');
    expect(logo).toBeInTheDocument();
    const themeButton = header.querySelector('.theme-button');
    expect(themeButton).toBeInTheDocument();
  });

  test('renders landing page as initial route', () => {
    render(<App />);
    const pageHeading = screen.getByText(/Welcome!/i);
    expect(pageHeading).toBeInTheDocument();
    const pageParagraph = screen.getByText(/Projectable is a lightweight/i);
    expect(pageParagraph).toBeInTheDocument();
  });
});
