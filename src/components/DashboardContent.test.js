import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../ThemeProvider';
import DashboardContent from './DashboardContent';

beforeEach(() => {
  render(
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Link to="/dashboard">Test Link</Link>} />
          <Route path="/dashboard/*" element={<DashboardContent />} />
        </Routes>
      </Router>
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
});
