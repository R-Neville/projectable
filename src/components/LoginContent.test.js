import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../context-providers/ThemeProvider';
import LoginContent from './LoginContent';

beforeAll(() => {
  render(
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginContent />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
});

describe('login page content', () => {
  describe('clear action', () => {
    test('clears login form', () => {
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        input.value = 'Test';
      });
      const clearButton = screen.getByText(/Clear/);
      userEvent.click(clearButton);
      inputs.forEach((input) => {
        expect(input.value).toBe('');
      });
    });
  });
});
