import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import themes from '../../themes';
import UserMenuAction from './UserMenuAction';

describe('UserMenuAction', () => {
  test('renders with correct colors', () => {
    render(
      <ThemeProvider>
        <UserMenuAction></UserMenuAction>
      </ThemeProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveStyle({
      'background-color': themes.light.fgHighlight,
      color: themes.light.bgAccent,
    });
  });

  test('renders text correctly', () => {
    render(
      <ThemeProvider>
        <UserMenuAction text="test"></UserMenuAction>
      </ThemeProvider>
    );

    const button = screen.getByText(/test/);
    expect(button).toBeInTheDocument();
  });

  test('onClick prop is called when clicked', () => {
    const onClick = jest.fn();

    render(
      <ThemeProvider>
        <UserMenuAction onClick={onClick}></UserMenuAction>
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(onClick).toBeCalled();
  });

  test('background color changes on mouseenter', async () => {
    render(
      <ThemeProvider>
        <UserMenuAction></UserMenuAction>
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);

    await waitFor(() =>
      expect(button).toHaveStyle({
        'background-color': themes.light.bgAccent + '22',
      })
    );
  });

  test('background color changes on mouseleave', async () => {
    render(
      <ThemeProvider>
        <UserMenuAction></UserMenuAction>
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);

    await waitFor(() =>
      expect(button).toHaveStyle({
        'background-color': themes.light.bgAccent + '22',
      })
    );

    fireEvent.mouseLeave(button);

    await waitFor(() =>
      expect(button).toHaveStyle({
        'background-color': themes.light.fgHighlight,
      })
    );
  });
});
