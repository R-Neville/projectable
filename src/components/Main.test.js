import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Link } from 'react-router-dom';
import ThemeProvider from '../context-providers/ThemeProvider';
import AuthProvider from '../context-providers/AuthProvider';
import Main from './Main';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Link data-testid="home-link" to="/" />
          <Link data-testid="login-link" to="/login" />
          <Link data-testid="register-link" to="/register" />
          <Link data-testid="dashboard-link" to="/dashboard" />
          <Link data-testid="project-link" to="/project/test" />
          <Link data-testid="invalid-link" to="/invalid" />
          <Main></Main>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

describe('Main', () => {
  test('defaults to home page', () => {
    render(<TestComponent></TestComponent>);
    const homePageTitle = screen.getByText(/Welcome/);
    expect(homePageTitle).toBeInTheDocument();
  });

  test('shows home frame on home link click', async () => {
    render(<TestComponent></TestComponent>);
    const homeLink = screen.getByTestId('home-link');
    userEvent.click(homeLink);
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Welcome/)).toBeInTheDocument()
      );
    });
  });

  test('shows login frame on login link click', async () => {
    render(<TestComponent></TestComponent>);
    const loginLink = screen.getByTestId('login-link');
    userEvent.click(loginLink);
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Login/)).toBeInTheDocument()
      );
    });
  });

  test('shows register frame on register link click', async () => {
    render(<TestComponent></TestComponent>);
    const registerLink = screen.getByTestId('register-link');
    userEvent.click(registerLink);
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Register/)).toBeInTheDocument()
      );
    });
  });

  test('shows dashboard frame on dashboard link click', async () => {
    render(<TestComponent></TestComponent>);
    const dashboardLink = screen.getByTestId('dashboard-link');
    userEvent.click(dashboardLink);
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Dashboard/)).toBeInTheDocument()
      );
    });
  });

  test('shows project frame on project link click', async () => {
    render(<TestComponent></TestComponent>);
    const projectLink = screen.getByTestId('project-link');
    // document.body.dispatchEvent(new CustomEvent('set-project-name', {
    //   bubbles: true,
    //   detail: {
    //     name: 'TEST',
    //   }
    // }));
    userEvent.click(projectLink);
    setTimeout(async () => {
      await waitFor(() => expect(screen.getByText(/Project/)).toBeInTheDocument());
    });
  });

  test('shows NoMatch component on invalid link click', async () => {
    render(<TestComponent></TestComponent>);
    const invalidLink = screen.getByTestId('invalid-link');
    userEvent.click(invalidLink);
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/There's Nothing Here!/)).toBeInTheDocument()
      );
    });
  });
});
