import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../ThemeProvider';
import themes from '../themes';
import FormActions from './FormActions';

const testActions = [
  {
    text: 'test1',
    onClick: () => console.log('test1'),
  },
  {
    text: 'test2',
    onClick: () => console.log('test2'),
  },
];

beforeEach(() => {
  render(
    <ThemeProvider>
      <FormActions actions={testActions} />
    </ThemeProvider>
  );
});

describe('FormActions', () => {
  test('renders 2 actions successfully', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });


});
