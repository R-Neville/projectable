import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

beforeAll(() => {
  render(<App />);
  const registerLink = screen.getByText(/Register/);
  userEvent.click(registerLink);
});

describe('register page content', () => {
  describe('clear action', () => {
    test('clears register form', () => {
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
