import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import projectableAPI, { ROOT_URL } from './config/axiosConfig';
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
    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Login/)).toBeInTheDocument()
      );
    });
  });

  test('renders register page when register link is clicked', () => {
    render(<App />);
    const registerLink = screen.getByText(/Register/);
    userEvent.click(registerLink);

    setTimeout(async () => {
      await waitFor(() =>
        expect(screen.getByText(/Register/)).toBeInTheDocument()
      );
    });
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
    expect(header).toHaveStyle({
      'background-color': themes.light.bgHighlight,
    });
  });
});

describe('login process', () => {
  describe('when login process is successful', () => {
    test('user is redirected to the dashboard', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(`${ROOT_URL}/users/login`)
        .reply(200, { uid: 'uid', token: 'token' });
      render(<App />);
      const loginLink = screen.getByText(/Login/);
      userEvent.click(loginLink);

      await waitFor(() =>
        expect(screen.getByText(/Submit/)).toBeInTheDocument()
      );

      const submitButton = screen.getByText(/Submit/);
      userEvent.click(submitButton);

      setTimeout(async () => {
        await waitFor(() =>
          expect(screen.getByText(/Dashboard/)).toBeInTheDocument()
        );
      });
    });
  });

  describe('when login process fails due to a network error', () => {
    test('Network Error is displayed', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onPost(`${ROOT_URL}/users/login`).networkError();
      render(<App />);
      const loginLink = screen.getByText(/Login/);
      userEvent.click(loginLink);

      await waitFor(() =>
        expect(screen.getByText(/Submit/)).toBeInTheDocument()
      );

      const submitButton = screen.getByText(/Submit/);
      userEvent.click(submitButton);

      setTimeout(async () => {
        await waitFor(() =>
          expect(screen.getByText(/Network Error/)).toBeInTheDocument()
        );
      });
    });
  });
});

describe('registration process', () => {
  describe('when registration process is successful', () => {
    test('user is redirected to the dashboard', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock
        .onPost(`${ROOT_URL}/users/register`)
        .reply(200, { uid: 'uid', token: 'token' });
      render(<App />);

      const registerLink = screen.getByText(/Register/);
      userEvent.click(registerLink);

      await waitFor(() =>
        expect(screen.getByText(/Submit/)).toBeInTheDocument()
      );

      const submitButton = screen.getByText(/Submit/);
      userEvent.click(submitButton);

      setTimeout(async () => {
        await waitFor(() =>
          expect(screen.getByText(/Dashboard/)).toBeInTheDocument()
        );
      });
    });
  });

  describe('when registration fails due to a network error', () => {
    test('Network Error is displayed', async () => {
      const mock = new MockAdapter(projectableAPI);
      mock.onPost(`${ROOT_URL}/users/register`).networkError();
      render(<App />);

      const registerLink = screen.getByText(/Register/);
      userEvent.click(registerLink);

      await waitFor(() =>
        expect(screen.getByText(/Submit/)).toBeInTheDocument()
      );

      const submitButton = screen.getByText(/Submit/);
      userEvent.click(submitButton);

      setTimeout(async () => {
        await waitFor(() =>
          expect(screen.getByText(/Network Error/)).toBeInTheDocument()
        );
      });
    });
  });
});
