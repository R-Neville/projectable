import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../context-providers/ThemeProvider';
import AuthProvider from '../context-providers/AuthProvider';
import HomeContent from './HomeContent';

beforeEach(() => {
  render(
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Link to="/" data-testid="home-link"/>
          <Routes>
            <Route path='/' element={<HomeContent />} />
            <Route path="/login" element={<p>login route element</p>} />
            <Route path="/register" element={<p>register route element</p>}/>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );

  const homeLink = screen.getByTestId('home-link');
  userEvent.click(homeLink);
});

describe('HomeContent', () => {
  test('renders section', () => {
    const section = screen.getByTestId('section');
    expect(section).toBeInTheDocument();
  });

  test('renders login link', () => {
    const loginLink = screen.getByText(/Login/);
    expect(loginLink).toBeInTheDocument();
  });

  test('renders register link', () => {
    const registerLink = screen.getByText(/Register/);
    expect(registerLink).toBeInTheDocument();
  });

  test('login link redirects the user to the /login route', () => {
    const loginLink = screen.getByText(/Login/);
    userEvent.click(loginLink);
    const loginRouteElement = screen.getByText(/login route element/);
    expect(loginRouteElement).toBeInTheDocument();
  });

  test('register link redirects the user to the /register route', () => {
    const registerLink = screen.getByText(/Register/);
    userEvent.click(registerLink);
    const registerRouteElement = screen.getByText(/register route element/);
    expect(registerRouteElement).toBeInTheDocument();
  });
});