import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import FormError from './FormError';

describe('FormError', () => {
  test('renders text correctly and onDismiss is called when button is clicked', () => {
    const onDismiss = jest.fn();
    
    render(
      <ThemeProvider>
        <FormError text="test" onDismiss={onDismiss}></FormError>
      </ThemeProvider>
    );

    const formError = screen.getByText(/test/);
    expect(formError).toBeInTheDocument();

    const dismissButton = screen.getByTestId(/dismiss-button/);
    expect(dismissButton).toBeInTheDocument();

    userEvent.click(dismissButton);
    expect(onDismiss).toBeCalled();
  });
});
