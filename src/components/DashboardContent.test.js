import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../context-providers/ThemeProvider';
import AuthProvider from '../context-providers/AuthProvider';
import DashboardContent from './DashboardContent';

beforeEach(() => {
  render(
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Link to="/dashboard">Test Link</Link>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/dashboard/*" element={<DashboardContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
});

describe('DashboardContent', () => {
  test('renders successfully with tasks frame as default route', () => {
    const testLink = screen.getByText(/Test Link/);
    userEvent.click(testLink);
    const heading = screen.getByText(/My Tasks/);
    expect(heading).toBeInTheDocument();
  });

  test('renders tasks frame successfully when tasks link is clicked', () => {
    const testLink = screen.getByText(/Test Link/);
    userEvent.click(testLink);
    const tasksLink = screen.getByTestId('dashboard-tasks-tab');
    userEvent.click(tasksLink);
    const heading = screen.getByText(/My Tasks/);
    expect(heading).toBeInTheDocument();
  });

  test('renders projects frame successfully when projects link is clicked', () => {
    const testLink = screen.getByText(/Test Link/);
    userEvent.click(testLink);
    const projectsLink = screen.getByTestId('dashboard-projects-tab');
    userEvent.click(projectsLink);
    const heading = screen.getByText(/My Projects/);
    expect(heading).toBeInTheDocument();
  });

  test('renders settings frame successfully when settings link is clicked', () => {
    const testLink = screen.getByText(/Test Link/);
    userEvent.click(testLink);
    const settingsLink = screen.getByTestId('dashboard-settings-tab');
    userEvent.click(settingsLink);
    const heading = screen.getByText(/My Settings/);
    expect(heading).toBeInTheDocument();
  });
});
