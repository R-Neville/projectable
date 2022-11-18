import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import DotMenu from './DotMenu';

describe('DotMenu', () => {
  test('renders without errors with no props passed', () => {
    render(
      <ThemeProvider>
        <DotMenu />
      </ThemeProvider>
    );
    const dotMenu = screen.getByTestId('dot-menu');
    expect(dotMenu).toBeInTheDocument();
  });

  test('renders dropdown after clicked', () => {
    render(
      <ThemeProvider>
        <DotMenu />
      </ThemeProvider>
    );
    const dotMenu = screen.getByTestId('dot-menu');
    userEvent.click(dotMenu);
    setTimeout(() => {
      const dropdown = screen.getByTestId('dot-menu-dopdown');
      expect(dropdown).toBeInTheDocument();
    });
  });

  test('dropdown is hidden when clicked twice', () => {
    render(
      <ThemeProvider>
        <DotMenu />
      </ThemeProvider>
    );
    const dotMenu = screen.getByTestId('dot-menu');
    userEvent.click(dotMenu);
    userEvent.click(dotMenu);
    setTimeout(() => {
      const dropdown = screen.getByTestId('dot-menu-dopdown');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  test('dropdown is hidden when the page is clicked after the dropdown has been displayed', () => {
    render(
      <ThemeProvider>
        <DotMenu />
      </ThemeProvider>
    );
    const dotMenu = screen.getByTestId('dot-menu');
    userEvent.click(dotMenu);
    userEvent.click(document.body);
    setTimeout(() => {
      const dropdown = screen.getByTestId('dot-menu-option');
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  test('renders actions after clicked', () => {
    render(
      <ThemeProvider>
        <DotMenu
          actions={[
            {
              text: 'action-1',
              onClick: null,
            },
            {
              text: 'action-2',
              onClick: null,
            },
          ]}
        />
      </ThemeProvider>
    );
    const dotMenu = screen.getByTestId('dot-menu');
    userEvent.click(dotMenu);
    setTimeout(() => {
      const action1 = screen.getByText(/action-1/);
      expect(action1).toBeInTheDocument();
      const action2 = screen.getByText(/action-2/);
      expect(action2).toBeInTheDocument();
    });
  });
});
