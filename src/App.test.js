import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import themes from './themes';

describe('app layout', () => {

  test('includes header', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('renders landing page as initial route', () => {
    render(<App />);
    const pageHeading = screen.getByText(/Welcome!/);
    expect(pageHeading).toBeInTheDocument();
  });

  test('renders login page when login link is clicked', () => {
    render(<App />);
    const loginLink = screen.getByText(/Login/);
    userEvent.click(loginLink);

    const pageHeading = screen.getByText(/Login/);
    expect(pageHeading).toBeInTheDocument();
  });

  test('renders register page when register link is clicked', () => {
    render(<App />);
    const registerLink = screen.getByText(/Register/);
    userEvent.click(registerLink);

    const pageHeading = screen.getByText(/Register/);
    expect(pageHeading).toBeInTheDocument();
  });
});

describe('theme button', () => {
  test('correctly changes header background color', () => {
    render(<App />);
    const header = screen.getByRole('banner');
    const themeButton = header.querySelector('.theme-button');
    userEvent.click(themeButton);
    // Default theme is light, so should now be dark:
    expect(header).toHaveStyle({ 'background-color': themes.dark.bgHighlight });
    userEvent.click(themeButton);
    // Should now be light again:
    expect(header).toHaveStyle({ 'background-color': themes.light.bgHighlight });
  });
});
