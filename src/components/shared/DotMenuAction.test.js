import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import DotMenuAction from './DotMenuAction';

describe('DotMenuAction', () => {
  test('renders without errors when no props are passed', () => {
    render(
      <ThemeProvider>
        <DotMenuAction />
      </ThemeProvider>
    );
    const dotMenuAction = screen.getByTestId(/dot-menu-action/);
    expect(dotMenuAction).toBeInTheDocument();
  });

  test('displays text when text property is passed', () => {
    render(
      <ThemeProvider>
        <DotMenuAction text="test" />
      </ThemeProvider>
    );
    const dotMenuAction = screen.getByText(/test/);
    expect(dotMenuAction).toBeInTheDocument();
  });

  test('onClick is called when clicked', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider>
        <DotMenuAction onClick={onClick} />
      </ThemeProvider>
    );
    const dotMenuAction = screen.getByTestId(/dot-menu-action/);
    userEvent.click(dotMenuAction);
    expect(onClick).toBeCalled();
  });
});
