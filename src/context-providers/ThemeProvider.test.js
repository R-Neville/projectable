import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, { useThemeContext } from './ThemeProvider';
import themes from '../themes';
import ThemeManager from '../utils/ThemeManager';
import { useCallback } from 'react';

const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useThemeContext();

  const createSpans = useCallback(() => {
    return Object.keys(theme).map((color, i) => {
      return <span key={color}>{`${color} ${theme[color]}`}</span>;
    });
  }, [theme]);

  return (
    <>
      {createSpans()}
      <button onClick={toggleTheme}></button>
    </>
  );
};

describe('ThemeProvider', () => {
  test('provides the 2 predefined themes to child elements', () => {
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    for (let color in themes.light) {
      const span = screen.getByText(`${color} ${themes.light[color]}`);
      expect(span).toBeInTheDocument();
    }

    const button = document.querySelector('button');

    userEvent.click(button);

    for (let color in themes.dark) {
      const span = screen.getByText(`${color} ${themes.dark[color]}`);
      expect(span).toBeInTheDocument();
    }
  });

  test('loads the light theme when set in local storage', () => {
    const tm = new ThemeManager();
    tm.goLight();

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    for (let color in themes.light) {
      const span = screen.getByText(`${color} ${themes.light[color]}`);
      expect(span).toBeInTheDocument();
    }
  });

  test('loads the dark theme when set in local storage', () => {
    const tm = new ThemeManager();
    tm.goDark();

    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    for (let color in themes.dark) {
      const span = screen.getByText(`${color} ${themes.dark[color]}`);
      expect(span).toBeInTheDocument();
    }
  });
});
