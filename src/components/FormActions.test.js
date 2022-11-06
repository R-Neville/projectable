import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../ThemeProvider';
import themes from '../themes';
import FormActions from './FormActions';

const testActions = [
  {
    text: 'test1',
    onClick: jest.fn(),
  },
  {
    text: 'test2',
    onClick: jest.fn(),
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
    expect(buttons.length).toBe(testActions.length);
  });

  test('registers onClick handlers successfully for each action', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      userEvent.click(button);
    });
    testActions.forEach((action) => {
      expect(action.onClick.mock.calls.length).toBe(1);
    });
  });

  test('renders buttons with correct color and backgroundColor', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveStyle({
        color: themes.light.fgHighlight,
        'background-color': themes.light.bgHighlight,
      });
    });
  });
});
