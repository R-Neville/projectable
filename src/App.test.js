import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import themes from './themes';

describe('app layout', () => {

  test('includes header with logo and theme button', () => {
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
    const pageHeading = screen.getByText(/Welcome!/);
    expect(pageHeading).toBeInTheDocument();
    const pageParagraph = screen.getByText(/Projectable is a lightweight/);
    expect(pageParagraph).toBeInTheDocument();
  });

  test('renders login page when login link is clicked', () => {
    render(<App />);
    const loginLink = screen.getByText(/Login/);
    userEvent.click(loginLink);

    const pageHeading = screen.getByText(/Login/);
    expect(pageHeading).toBeInTheDocument();
  
    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    const labels = form.querySelectorAll('label');
    expect(labels.length).toBe(2);
    
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(2);
    
    const buttons = form.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    const p = screen.getByText(/Don't have an account\?/);
    expect(p).toBeInTheDocument();
  });

  test('renders register page when register link is clicked', () => {
    render(<App />);
    const registerLink = screen.getByText(/Register/);
    userEvent.click(registerLink);

    const pageHeading = screen.getByText(/Register/);
    expect(pageHeading).toBeInTheDocument();

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();

    const labels = form.querySelectorAll('label');
    expect(labels.length).toBe(4);
    
    const inputs = form.querySelectorAll('input');
    expect(inputs.length).toBe(4);
    
    const buttons = form.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    const p = screen.getByText(/Already have an account\?/);
    expect(p).toBeInTheDocument();
  });
});

describe('theme button', () => {
  test('correctly changes header background color', () => {
    render(<App />);
    const header = document.querySelector('header');
    const themeButton = header.querySelector('.theme-button');
    userEvent.click(themeButton);
    // Default theme is light, so should now be dark:
    expect(header).toHaveStyle({ 'background-color': themes.dark.bgHighlight });
    userEvent.click(themeButton);
    // Should now be light again:
    expect(header).toHaveStyle({ 'background-color': themes.light.bgHighlight });
  });
});
